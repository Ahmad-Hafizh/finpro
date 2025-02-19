import { prisma } from "../../../../../packages/database/src/client";

interface IfindProduct {
  pageNumber: number;
  pageSize: number;
  keyword: string;
  category: string;
  sortBy: string;
  deletedAt: string;
}

export const findProduct = async ({
  category,
  pageNumber,
  pageSize,
  keyword,
  sortBy,
  deletedAt,
}: IfindProduct): Promise<any> => {
  console.log("category in services :", category);
  console.log("Sort by :", sortBy);
  console.log("Deleted at :", deletedAt);
  const result = await prisma.product.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
    where: {
      AND: [
        category
          ? {
              product_category: {
                product_category_name: category as string,
              },
            }
          : {},
        keyword
          ? {
              OR: [
                { product_name: { contains: keyword, mode: "insensitive" } },
                {
                  product_description: {
                    contains: keyword,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {},
        deletedAt === "true"
          ? { deletedAt: { not: null } }
          : deletedAt === "false"
            ? { deletedAt: null }
            : {},
      ],
    },
    orderBy: sortBy
      ? sortBy === "name-asc"
        ? { product_name: "asc" }
        : sortBy === "name-desc"
          ? { product_name: "desc" }
          : sortBy === "price-asc"
            ? { product_price: "asc" }
            : sortBy === "price-desc"
              ? { product_price: "desc" }
              : undefined
      : undefined,
    include: {
      stock: true,
      product_img: true,
      product_category: true,
      voucher: true,
    },
  });

  const totalItems = await prisma.product.count({
    where: {
      AND: [
        category
          ? {
              product_category: {
                product_category_name: category,
              },
            }
          : {},
        keyword
          ? {
              OR: [
                { product_name: { contains: keyword, mode: "insensitive" } },
                {
                  product_description: {
                    contains: keyword,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {},
        deletedAt === "true"
          ? { deletedAt: { not: null } }
          : deletedAt === "false"
            ? { deletedAt: null }
            : {},
      ],
    },
  });

  const totalPages = Math.ceil(totalItems / pageSize);

  return { products: result, totalItems, totalPages };
};
