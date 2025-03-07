import prisma from "../../prisma";

interface CancelUserOrderParams {
  admin: any;
  order_id: string;
  reason?: string;
}

export async function cancelUserOrderService({
  admin,
  order_id,
  reason,
}: CancelUserOrderParams) {
  const order = await prisma.order.findUnique({
    where: { order_id: Number(order_id) },
    include: { order_items: true },
  });
  if (!order) throw new Error("Order tidak ditemukan");

  // hanya bisa dibatalkan jika status order masih sebelum "dikirim"
  if (
    order.status === "dikirim" ||
    order.status === "pesanan_dikonfirmasi" ||
    order.status === "dibatalkan"
  ) {
    throw new Error("Order tidak dapat dibatalkan pada tahap ini");
  }

  const updatedOrder = await prisma.order.update({
    where: { order_id: order.order_id },
    data: { status: "dibatalkan" },
  });

  // kembalikan stok untuk tiap item pesanan dan buat jurnal stok
  for (const item of order.order_items) {
    const stock = await prisma.stock.findFirst({
      where: {
        product_id: item.product_id,
        store_id: order.store_id,
      },
    });
    if (stock) {
      await prisma.stock.update({
        where: { stock_id: stock.stock_id },
        data: { quantity: stock.quantity + item.quantity },
      });
      await prisma.stockJournal.create({
        data: {
          store_id: order.store_id,
          stock_id: stock.stock_id,
          product_id: item.product_id,
          quantity: item.quantity,
          type: "in",
          notes: `Order ${order.order_number || order.order_id} dibatalkan: ${reason || "Alasan tidak diberikan"}`,
          created_at: new Date(),
          stock_result: stock.quantity + item.quantity,
        },
      });
    }
  }

  await prisma.adminOrder.create({
    data: {
      admin_id: admin ? admin.admin_id : 0,
      order_id: order.order_id,
      action: "batalkan_pesanan",
      action_time: new Date(),
    },
  });

  return updatedOrder;
}
