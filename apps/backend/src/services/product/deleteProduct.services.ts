import prisma from "../../prisma";

interface IdeleteProduct {
  product_id: string;
}

export const deleteProduct = async ({
  product_id,
}: IdeleteProduct): Promise<any> => {
  console.log("PRODUCT ID DI DALAM SERVICES: ", product_id);
  const result = await prisma.$transaction(async (tx) => {
    const checkProductName = await tx.product.findFirst({
      where: {
        product_id: parseInt(product_id),
      },
    });

    if (!checkProductName) {
      throw new Error("Product not found.");
    }

    const product = await tx.product.update({
      where: { product_id: parseInt(product_id) },
      data: {
        deletedAt: new Date(Date.now()),
      },
    });
  });
  return result;
};
