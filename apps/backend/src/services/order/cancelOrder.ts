import prisma from "../../prisma";

interface CancelOrderParams {
  profile_id: number;
  order_id: number;
  reason?: string;
}

export async function cancelOrderService({
  profile_id,
  order_id,
  reason,
}: CancelOrderParams) {
  const order = await prisma.order.findUnique({
    where: { order_id },
    include: { order_items: true },
  });
  if (!order || order.profile_id !== profile_id) {
    throw new Error("Order not found");
  }
  if (order.status !== "menunggu_pembayaran") {
    throw new Error("Order cannot be canceled at this stage");
  }

  const canceledOrder = await prisma.$transaction(async (tx) => {
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
            notes: `Order ${order.order_number || order.order_id} canceled by user: ${reason || "No reason provided"}`,
            created_at: new Date(),
            stock_result: stock.quantity + item.quantity,
          },
        });
      }
    }

    await tx.orderCancel.create({
      data: {
        order_id: order.order_id,
        reason: reason || "User canceled the order",
        canceled_at: new Date(),
      },
    });

    const updatedOrder = await tx.order.update({
      where: { order_id: order.order_id },
      data: { status: "dibatalkan" },
    });
    return updatedOrder;
  });

  return canceledOrder;
}
