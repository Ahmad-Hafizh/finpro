import prisma from "../../prisma";

interface UpdateCartItemParams {
  cart_item_id: number;
  quantity: number;
}

export async function updateCartItemService({
  cart_item_id,
  quantity,
}: UpdateCartItemParams) {
  if (quantity < 1) {
    throw new Error("Quantity should be more than 0");
  }

  const cartItem = await prisma.cartItem.findUnique({
    where: { cart_item_id },
  });
  if (!cartItem) {
    throw new Error("Item doesn't exist");
  }

  const stock = await prisma.stock.findFirst({
    where: { product_id: cartItem.product_id },
  });
  if (!stock || stock.quantity < quantity) {
    throw new Error("Insufficient stock");
  }

  const updatedCartItem = await prisma.cartItem.update({
    where: { cart_item_id },
    data: { quantity },
  });

  return updatedCartItem;
}
