import prisma from "../../prisma";

export const getCategory = async (
  pageNumber: any,
  pageSize: any
): Promise<any> => {
  if (pageNumber && pageSize) {
    const number = parseInt(pageNumber);
    const size = parseInt(pageSize);

    const result = await prisma.productCategory.findMany({
      skip: (number - 1) * size,
      take: size,
    });

    const totalItems = await prisma.productCategory.count();

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / size);
    return {
      result: result,
      totalItems,
      totalPages,
      currentPage: number,
      pageSize: size,
    };
  } else {
    const result = await prisma.productCategory.findMany();
    return result;
  }
};
