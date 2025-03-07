import prisma from "../../prisma";

export async function getCartItemsCountService(userId: string) {
  const profile = await prisma.profile.findUnique({
    where: { user_id: userId },
  });
  if (!profile) {
    throw new Error("Profile not found");
  }

  const cart = await prisma.cart.findFirst({
    where: { profile_id: profile.profile_id },
    include: { cart_items: true },
  });

  const itemCount = cart?.cart_items?.length ?? 0;
  return { count: itemCount };
}
