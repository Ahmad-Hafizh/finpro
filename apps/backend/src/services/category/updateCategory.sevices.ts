import { prisma } from "../../../../../packages/database/src/client";

interface IupdateCategory {
  id: string;
  name: string;
}

export const updateCategory = async ({
  id,
  name,
}: IupdateCategory): Promise<any> => {
  const result = await prisma.$transaction(async (tx) => {
    const checkCategoryId = await tx.productCategory.findFirst({
      where: {
        product_category_id: parseInt(id),
      },
    });

    if (!checkCategoryId) {
      throw new Error("Category not found!");
    }

    const updateCategory = await tx.productCategory.update({
      where: {
        product_category_id: checkCategoryId.product_category_id,
      },
      data: {
        product_category_name: name as string,
      },
    });
  });

  return result;
};
