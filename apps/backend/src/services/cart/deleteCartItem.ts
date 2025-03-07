import prisma from "../../prisma";

export async function deleteCartItemService(cart_item_id: number) {
  await prisma.cartItem.delete({
    where: { cart_item_id },
  });
  return { message: "Item deleted successfully" };
}
