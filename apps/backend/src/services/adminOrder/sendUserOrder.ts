import prisma from "../../prisma";

interface SendUserOrderParams {
  admin: any;
  order_id: string;
  tracking_number?: string;
}

export async function sendUserOrderService({
  admin,
  order_id,
  tracking_number,
}: SendUserOrderParams) {
  const order = await prisma.order.findUnique({
    where: { order_id: Number(order_id) },
  });
  if (!order) throw new Error("Order tidak ditemukan");

  if (order.status !== "diproses") {
    throw new Error("Order is not in a state that can be sent");
  }

  const updatedOrder = await prisma.order.update({
    where: { order_id: order.order_id },
    data: {
      status: "dikirim",
      tracking_number:
        tracking_number !== undefined ? tracking_number : order.tracking_number,
    },
  });

  await prisma.adminOrder.create({
    data: {
      admin_id: admin ? admin.admin_id : 0,
      order_id: order.order_id,
      action: "kirim_pesanan",
      action_time: new Date(),
    },
  });

  return updatedOrder;
}
