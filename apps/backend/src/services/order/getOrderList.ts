import prisma from "../../prisma";

interface GetOrderListParams {
  profile_id: number;
  date?: string;
  order_id?: number;
}

export async function getOrderListService({
  profile_id,
  date,
  order_id,
}: GetOrderListParams) {
  let whereClause: any = { profile_id };

  if (order_id) whereClause.order_id = order_id;
  if (date) {
    const localStart = new Date(date + "T00:00:00");
    const localEnd = new Date(date + "T23:59:59");
    const start = new Date(localStart.getTime() - 7 * 60 * 60 * 1000);
    const end = new Date(localEnd.getTime() - 7 * 60 * 60 * 1000);
    whereClause.order_date = { gte: start, lt: end };
  }

  const orders = await prisma.order.findMany({
    where: whereClause,
    include: {
      order_items: { include: { product: true } },
      payment_proof: true,
    },
  });
  return orders;
}
