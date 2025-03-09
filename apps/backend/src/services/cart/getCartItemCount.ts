import ResponseHandler from '../../utils/responseHandler';
import prisma from '../../prisma';
import { Response } from 'express';

export async function getCartItemsCountService(res: Response, userId: string) {
  const profile = await prisma.profile.findUnique({
    where: { user_id: userId },
  });

  if (!profile) {
    return ResponseHandler.error(res, 404, 'Profile not found');
  }

  const cart = await prisma.cart.findFirst({
    where: { profile_id: profile.profile_id },
    include: { cart_items: true },
  });

  const itemCount = cart?.cart_items?.length ?? 0;
  return { count: itemCount };
}
