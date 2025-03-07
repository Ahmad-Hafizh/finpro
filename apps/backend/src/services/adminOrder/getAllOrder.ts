import prisma from "../../prisma";

interface GetAllOrdersParams {
  admin: any;
  query: any;
}

export async function getAllOrdersService({
  admin,
  query,
}: GetAllOrdersParams) {
  const pageSize = 10;
  const page = Number(query.page) || 1;

  let whereClause: any = {};
  if (admin && admin.user.role !== "super_admin") {
    whereClause.store_id = admin.store_id;
  } else {
    if (query.store_id) {
      whereClause.store_id = Number(query.store_id);
    }
  }

  if (query.orderNumber) {
    whereClause.order_number = {
      contains: query.orderNumber as string,
      mode: "insensitive",
    };
  }
  if (query.orderDate) {
    const orderDate = new Date(query.orderDate as string);
    const startDate = new Date(orderDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(orderDate);
    endDate.setHours(23, 59, 59, 999);
    whereClause.order_date = { gte: startDate, lte: endDate };
  }

  const totalCount = await prisma.order.count({ where: whereClause });
  const totalPages = Math.ceil(totalCount / pageSize);
  const orders = await prisma.order.findMany({
    where: whereClause,
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      order_items: { include: { product: true } },
      payment_proof: true,
      address: true,
      profile: true,
    },
  });

  return { orders, totalPages };
}
