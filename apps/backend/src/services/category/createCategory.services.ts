import { prisma } from "../../../../../packages/database/src/client";

interface IcreateCategory {
  name: string;
}

export const createCategory = async ({
  name,
}: IcreateCategory): Promise<any> => {
  const result = await prisma.$transaction(async (tx) => {
    const checkCategoryName = await tx.productCategory.findFirst({
      where: {
        product_category_name: name as string,
      },
    });

    if (checkCategoryName) {
      throw new Error(
        "Product has already been added. Cannot add same product."
      );
    }

    const createCategory = await tx.productCategory.create({
      data: {
        product_category_name: name as string,
      },
    });
  });

  return result;
};
