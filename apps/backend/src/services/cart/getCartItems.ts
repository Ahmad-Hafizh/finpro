import prisma from "../../prisma";

export async function getCartItemsService(userId: string) {
  const profile = await prisma.profile.findUnique({
    where: { user_id: userId },
  });
  if (!profile) {
    throw new Error("Profile not found");
  }

  const cart = await prisma.cart.findFirst({
    where: { profile_id: profile.profile_id },
    include: {
      cart_items: {
        include: {
          product: {
            include: {
              product_img: true,
              stock: {
                include: {
                  store: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!cart) {
    return { items: [], total: 0 };
  }

  const itemsWithTotal = cart.cart_items.map((item) => ({
    ...item,
    subtotal: item.quantity * item.product.product_price,
    store_name: item.product.stock[0]?.store?.store_name ?? "Unknown Store",
    product: {
      ...item.product,
      stock:
        item.product.stock.length > 0
          ? {
              ...item.product.stock[0],
              store: item.product.stock[0].store,
            }
          : null,
    },
  }));

  const total = itemsWithTotal.reduce((sum, item) => sum + item.subtotal, 0);

  return {
    items: itemsWithTotal,
    total,
  };
}
