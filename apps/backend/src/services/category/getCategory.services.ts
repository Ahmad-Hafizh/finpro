import { prisma } from "../../../../../packages/database/src/client";

export const getCategory = async (): Promise<any> => {
  const result = await prisma.productCategory.findMany();
  return result;
};
