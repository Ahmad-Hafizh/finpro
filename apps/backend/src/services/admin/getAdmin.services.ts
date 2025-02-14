import { prisma } from "../../../../../packages/database/src/client";

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
}: IfindAdmin): Promise<IAdmin[]> => {
  const result = await prisma.admin.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
    where: {
      store_id: store as unknown as number,
      OR: [
        {
          account: {
            name: { contains: keyword as string, mode: "insensitive" },
          },
        },
        {
          account: {
            email: { contains: keyword as string, mode: "insensitive" },
          },
        },
        { phone: { contains: keyword as string, mode: "insensitive" } },
        { position: { contains: keyword as string, mode: "insensitive" } },
      ],
    },
    include: {
      account: true,
    },
  });

  return result;
};
