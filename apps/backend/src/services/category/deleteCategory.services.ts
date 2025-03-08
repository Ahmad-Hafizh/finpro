import prisma from "../../prisma";

interface IdeleteCategory {
  id: string;
}

export const deleteCategory = async ({ id }: IdeleteCategory): Promise<any> => {
  const result = await prisma.$transaction(async (tx) => {
    const checkCategoryId = await tx.productCategory.findFirst({
      where: {
        product_category_id: parseInt(id),
      },
    });

    if (!checkCategoryId) {
      throw new Error("Category not found");
    }

    const createCategory = await tx.productCategory.update({
      where: {
        product_category_id: parseInt(id),
      },
      data: {
        deletedAt: new Date(Date.now()),
      },
    });

    const deleteProduct = await tx.product.updateMany({
      where: {
        product_category_id: createCategory.product_category_id,
      },
      data: {
        deletedAt: new Date(Date.now()),
      },
    });
  });

  return result;
};
