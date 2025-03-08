import prisma from "../../prisma";

interface IupdateProduct {
  id?: number;
  name?: string;
  price?: string;
  description?: string;
  category?: string;
  image?: string[];
}

export const updateProduct = async ({
  id,
  name,
  price,
  description,
  category,
  image,
}: IupdateProduct): Promise<any> => {
  const result = await prisma.$transaction(async (tx) => {
    const existingProduct = await tx.product.findFirst({
      where: { product_id: id },
    });

    console.log("INI EXISTING PRODUCTTTTTTT : ", existingProduct);

    if (!existingProduct) {
      throw new Error("Product not found. Cannot update non-existing product.");
    }

    const updatedProduct = await tx.product.update({
      where: { product_id: existingProduct.product_id },
      data: {
        product_name: name ?? existingProduct.product_name,
        product_price: price ? parseInt(price) : existingProduct.product_price,
        product_description: description ?? existingProduct.product_description,
        product_category: {
          connect: { product_category_name: category },
        },
      },
    });

    if (image) {
      if (image.length > 0) {
        await tx.productImg.deleteMany({
          where: { product_id: existingProduct.product_id },
        });

        await Promise.all(
          image.map(async (imageUrl) => {
            await tx.productImg.create({
              data: {
                image_url: imageUrl,
                product: {
                  connect: { product_id: existingProduct.product_id },
                },
              },
            });
          })
        );
      }
    }

    return updatedProduct;
  });

  return result;
};
