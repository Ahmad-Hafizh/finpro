import prisma from "../../prisma";

interface IfindAdmin {
  pageNumber: number;
  pageSize: number;
  keyword: string;
  store: string;
}

interface IAdmin {
  admin_id: number;
  account_id: number;
  store_id: number;
  phone: string;
  position: string;
}
export const findAdmin = async ({
  store,
  pageNumber,
  pageSize,
  keyword,
}: IfindAdmin): Promise<any> => {
  const result = await prisma.admin.findMany({
    skip: (pageNumber - 1) * pageSize,
    where: {
      AND: [
        store ? { store_id: parseInt(store) } : {},
        keyword
          ? {
              OR: [
                { user: { name: { contains: keyword, mode: "insensitive" } } },
                { user: { email: { contains: keyword, mode: "insensitive" } } },
              ],
            }
          : {},
      ],
    },
    take: pageSize,
    include: {
      user: true,
      store: true,
    },
  });

  const totalItems = await prisma.admin.count({
    where: {
      AND: [
        store ? { store_id: parseInt(store) } : {},
        keyword
          ? {
              OR: [
                { user: { name: { contains: keyword, mode: "insensitive" } } },
                { user: { email: { contains: keyword, mode: "insensitive" } } },
              ],
            }
          : {},
      ],
    },
  });

  const totalPages = Math.ceil(totalItems / pageSize);

  return { admins: result, totalItems, totalPages };
};
