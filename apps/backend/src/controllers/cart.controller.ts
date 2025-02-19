import { Request, Response } from 'express';
import { prisma } from '../../../../packages/database/src/client';

export class CartController {
  // add to cart
  async addToCart(req: Request, res: Response): Promise<any> {
    const { product_id, quantity } = req.body;
    const userId = '1'; // test user id

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
<<<<<<< HEAD
        include: { accounts: true, profile: true },
=======
        include: { accounts: true },
>>>>>>> main
      });

      if (!user || !user.emailVerified) {
        return res.status(403).json({
          error: 'User not found or not verified',
        });
      }

      const profile = await prisma.profile.findUnique({
        where: { user_id: user.id },
      });

      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      const stock = await prisma.stock.findFirst({
        where: { product_id },
      });

      if (!stock || stock.quantity < quantity) {
        return res.status(400).json({
          error: 'Insufficient product stock',
        });
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
        return res.status(500).json({ error: 'Failed to create cart' });
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
        return res.status(200).json(updatedCartItem);
      }

      const newCartItem = await prisma.cartItem.create({
        data: {
          cart_id: cart.cart_id,
          product_id,
          quantity,
        },
      });

      return res.status(201).json(newCartItem);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to add to cart' });
    }
  }

  // get cart items count
  async getCartItemsCount(req: Request, res: Response): Promise<any> {
    const userId = '1';
    try {
      const profile = await prisma.profile.findUnique({
        where: { user_id: userId },
      });

      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      const cart = await prisma.cart.findFirst({
        where: { profile_id: profile.profile_id },
        include: { cart_items: true },
      });

      const itemCount = cart?.cart_items?.length ?? 0;
      return res.status(200).json({ count: itemCount });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to get item count' });
    }
  }

  // get cart items
  async getCartItems(req: Request, res: Response): Promise<any> {
    const userId = '1';
    try {
      const profile = await prisma.profile.findUnique({
        where: { user_id: userId },
      });

      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
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
        return res.status(200).json({ items: [] });
      }

      const itemsWithTotal = cart.cart_items.map((item) => ({
        ...item,
        subtotal: item.quantity * item.product.product_price,
        store_name: item.product.stock?.store?.store_name ?? 'Unknown Store',
        product: {
          ...item.product,
          stock: item.product.stock
            ? {
                ...item.product.stock,
                store: item.product.stock.store,
              }
            : null,
        },
      }));

      const total = itemsWithTotal.reduce((sum, item) => sum + item.subtotal, 0);

      return res.status(200).json({
        items: itemsWithTotal,
        total,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to get items' });
    }
  }

  // update cart item quantity
  async updateCartItem(req: Request, res: Response): Promise<any> {
    const { cart_item_id } = req.params;
    const { quantity } = req.body;

    try {
      if (quantity < 1) {
        return res.status(400).json({
          error: 'Quantity should be more than 0',
        });
      }

      const cartItem = await prisma.cartItem.findUnique({
        where: { cart_item_id: parseInt(cart_item_id, 10) },
      });

      if (!cartItem) {
        return res.status(404).json({ error: "Item doesn't exist" });
      }

      const stock = await prisma.stock.findFirst({
        where: { product_id: cartItem.product_id },
      });

      if (!stock || stock.quantity < quantity) {
        return res.status(400).json({ error: 'Insufficient stock' });
      }

      const updatedCartItem = await prisma.cartItem.update({
        where: { cart_item_id: parseInt(cart_item_id, 10) },
        data: { quantity },
      });

      return res.status(200).json(updatedCartItem);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update item' });
    }
  }

  // delete cart item
  async deleteCartItem(req: Request, res: Response): Promise<any> {
    const { cart_item_id } = req.params;

    try {
      await prisma.cartItem.delete({
        where: { cart_item_id: parseInt(cart_item_id, 10) },
      });

      return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to delete item' });
    }
  }
}
