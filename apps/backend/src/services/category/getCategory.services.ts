import prisma from "../../prisma";

export const getCategory = async (): Promise<any> => {
  const result = await prisma.productCategory.findMany();
  return result;
};
