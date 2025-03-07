import prisma from "../../prisma";

export async function autoConfirmOrdersService() {
  const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
  const ordersToConfirm = await prisma.order.findMany({
    where: {
      status: "dikirim",
      order_date: { lt: twoDaysAgo },
    },
  });
  for (const order of ordersToConfirm) {
    await prisma.order.update({
      where: { order_id: order.order_id },
      data: { status: "pesanan_dikonfirmasi" },
    });
    console.log(`Order ${order.order_id} auto confirmed.`);
  }
}
