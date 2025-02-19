import { prisma } from "../../../../../packages/database/src/client";

export const findDetailedProduct = async ({ name }: any): Promise<any> => {
  console.log("This is name", name);
  const result = await prisma.product.findFirst({
    where: {
      product_name: name,
    },
    include: {
      product_category: true,
      product_img: true,
      voucher: true,
      stock: true,
    },
  });

  return result;
};
