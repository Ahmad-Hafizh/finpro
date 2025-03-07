import prisma from "../../prisma";

interface AddToCartParams {
  userId: string;
  product_id: number;
  quantity: number;
}

export async function addToCartService({
  userId,
  product_id,
  quantity,
}: AddToCartParams) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { accounts: true },
  });
  if (!user || !user.emailVerified) {
    throw new Error("User not found or not verified");
  }

  const profile = await prisma.profile.findUnique({
    where: { user_id: user.id },
  });
  if (!profile) {
    throw new Error("Profile not found");
  }

  const stock = await prisma.stock.findFirst({
    where: { product_id },
  });
  if (!stock || stock.quantity < quantity) {
    throw new Error("Insufficient product stock");
  }

  let cart = await prisma.cart.findFirst({
    where: { profile_id: profile.profile_id },
    include: { cart_items: true },
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        profile_id: profile.profile_id,
        created_at: new Date(),
        cart_items: {
          create: [],
        },
      },
      include: { cart_items: true },
    });
  }

  if (!cart) {
    throw new Error("Failed to create cart");
  }

  const existingCartItem = await prisma.cartItem.findFirst({
    where: {
      cart_id: cart.cart_id,
      product_id,
    },
  });

  if (existingCartItem) {
    const updatedCartItem = await prisma.cartItem.update({
      where: { cart_item_id: existingCartItem.cart_item_id },
      data: { quantity: existingCartItem.quantity + quantity },
    });
    return updatedCartItem;
  }

  const newCartItem = await prisma.cartItem.create({
    data: {
      cart_id: cart.cart_id,
      product_id,
      quantity,
    },
  });

  return newCartItem;
}
