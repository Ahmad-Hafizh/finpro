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
}: IfindAdmin): Promise<any> => {
  const result = await prisma.admin.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });

  return result;
};
