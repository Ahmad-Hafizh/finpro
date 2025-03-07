import prisma from "../../prisma";

export async function getOrderByIdService(
  profile_id: number,
  order_id: number
) {
  const order = await prisma.order.findUnique({
    where: { order_id },
    include: {
      order_items: { include: { product: true } },
      payment_proof: true,
    },
  });
  if (!order || order.profile_id !== profile_id) {
    throw new Error("Order not found");
  }
  return order;
}
