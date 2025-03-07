import prisma from "../../prisma";

export async function autoCancelOrdersService() {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const ordersToCancel = await prisma.order.findMany({
    where: {
      status: "menunggu_pembayaran",
      order_date: { lt: oneHourAgo },
    },
    include: { order_items: true },
  });
  for (const order of ordersToCancel) {
    await prisma.$transaction(async (tx) => {
      for (const item of order.order_items) {
        const stock = await tx.stock.findFirst({
          where: {
            product_id: item.product_id,
            store_id: order.store_id,
          },
        });
        if (stock) {
          await tx.stock.update({
            where: { stock_id: stock.stock_id },
            data: { quantity: stock.quantity + item.quantity },
          });
          await tx.stockJournal.create({
            data: {
              store_id: order.store_id,
              stock_id: stock.stock_id,
              product_id: item.product_id,
              quantity: item.quantity,
              type: "in",
              notes: `Auto cancel order ${order.order_number || order.order_id}: stock returned`,
              created_at: new Date(),
              stock_result: stock.quantity + item.quantity,
            },
          });
        }
      }
      await tx.orderCancel.create({
        data: {
          order_id: order.order_id,
          reason: "Auto cancelled due to timeout",
          canceled_at: new Date(),
        },
      });
      await tx.order.update({
        where: { order_id: order.order_id },
        data: { status: "dibatalkan" },
      });
    });
    console.log(`Order ${order.order_id} auto cancelled and stock returned.`);
  }
}
