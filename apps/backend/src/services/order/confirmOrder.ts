import prisma from "../../prisma";

interface ConfirmOrderParams {
  profile_id: number;
  order_id: number;
}

export async function confirmOrderService({
  profile_id,
  order_id,
}: ConfirmOrderParams) {
  const order = await prisma.order.findUnique({ where: { order_id } });
  if (!order || order.profile_id !== profile_id) {
    throw new Error("Order not found");
  }
  if (order.status !== "dikirim") {
    throw new Error("Order cannot be confirmed at this stage");
  }
  const updatedOrder = await prisma.order.update({
    where: { order_id: order.order_id },
    data: { status: "pesanan_dikonfirmasi" },
  });
  return updatedOrder;
}
