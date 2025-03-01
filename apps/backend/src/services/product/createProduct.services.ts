import prisma from "../../prisma";

interface IcreateProduct {
  name: string;
  price: string;
  description: string;
  category: string;
  image: string[];
}

export const createProduct = async ({
  name,
  price,
  description,
  category,
  image,
}: IcreateProduct): Promise<any> => {
  const result = await prisma.$transaction(async (tx) => {
    const checkProductName = await tx.product.findFirst({
      where: {
        product_name: name as string,
      },
    });

    if (checkProductName) {
      throw new Error(
        "Product has already been added. Cannot add same product."
      );
    }

    const product = await tx.product.create({
      data: {
        product_name: name,
        product_price: parseInt(price),
        product_description: description,
        product_category: {
          connect: { product_category_id: parseInt(category) },
        },
      },
    });

    console.log("Ini Image :", image);
    await Promise.all(
      image.map(async (imageUrl) => {
        await tx.productImg.create({
          data: {
            image_url: imageUrl,
            product: { connect: { product_id: product.product_id } },
          },
        });
      })
    );
  });
  return result;
};
