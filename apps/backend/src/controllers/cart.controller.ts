import { Request, Response } from "express";
import { prisma } from "../../../../packages/database/src/client";

export class CartController {
  // add to cart
  async addToCart(req: Request, res: Response): Promise<any> {
    const { product_id, quantity } = req.body;
    const user_id = 1; // test

    try {
      const user = await prisma.user.findUnique({
        where: { user_id: 1 },
        include: { account: true },
      });

      if (!user || !user.account.isVerified) {
        return res.status(403).json({
          error: "user not found or not verified",
        });
      }

      const stock = await prisma.stock.findFirst({
        where: { product_id },
      });

      if (!stock || stock.quantity < quantity) {
        return res.status(400).json({
          error: "insufficient product",
        });
      }

      // check apakah ada cart
      let cart = await prisma.cart.findFirst({
        where: { user_id: 1 },
        include: { cart_items: true },
      });

      // kalau tidak ada, empty array
      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            user_id: 1,
            created_at: new Date(),
            cart_items: {
              create: [],
            },
          },
          include: {
            cart_items: true,
          },
        });
      }

      if (!cart) {
        return res.status(500).json({ error: "failed to create cart" });
      }

      // cek apakah ada product
      const existingCartItem = await prisma.cartItem.findFirst({
        where: {
          cart_id: cart.cart_id,
          product_id,
        },
      });

      if (existingCartItem) {
        // update quantity Kalau ada product
        const updatedCartItem = await prisma.cartItem.update({
          where: { cart_item_id: existingCartItem.cart_item_id },
          data: { quantity: existingCartItem.quantity + quantity },
        });
        return res.status(200).json(updatedCartItem);
      }

      // kalau tidak ada create new item
      const newCartItem = await prisma.cartItem.create({
        data: {
          cart_id: cart.cart_id,
          product_id,
          quantity,
        },
      });

      res.status(201).json(newCartItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "failed to add to cart" });
    }
  }

  // get cart items count
  async getCartItemsCount(req: Request, res: Response): Promise<any> {
    try {
      const cart = await prisma.cart.findFirst({
        where: { user_id: 1 },
        include: { cart_items: true },
      });

      const itemCount = cart?.cart_items?.length ?? 0;
      res.status(200).json({ count: itemCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "failed to get item count" });
    }
  }

  // get cart items
  async getCartItems(req: Request, res: Response): Promise<any> {
    try {
      const cart = await prisma.cart.findFirst({
        where: { user_id: 1 },
        include: {
          cart_items: {
            include: {
              product: {
                select: {
                  product_id: true,
                  product_name: true,
                  product_price: true,
                  product_img: true,
                  stock: {
                    include: {
                      store: {
                        select: {
                          store_name: true,
                        },
                      },
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

      const itemsWithTotal = cart.cart_items.map((item) => {
        const storeName =
          item.product.stock && item.product.stock.length > 0
            ? item.product.stock[0].store.store_name
            : null;
        return {
          ...item,
          subtotal: item.quantity * item.product.product_price,
          store_name: storeName,
        };
      });

      res.status(200).json({
        items: itemsWithTotal,
        total: itemsWithTotal.reduce((sum, item) => sum + item.subtotal, 0),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "failed to get item" });
    }
  }

  // update cart item quantity
  async updateCartItem(req: Request, res: Response): Promise<any> {
    const { cart_item_id } = req.params;
    const { quantity } = req.body;

    try {
      if (quantity < 1) {
        return res.status(400).json({
          error: "quantity should be more than 0",
        });
      }

      // Get cart item and check stock
      const cartItem = await prisma.cartItem.findUnique({
        where: { cart_item_id: parseInt(cart_item_id) },
      });

      if (!cartItem) {
        return res.status(404).json({ error: "item doesnt exist" });
      }

      const stock = await prisma.stock.findFirst({
        where: { product_id: cartItem.product_id },
      });

      if (!stock || stock.quantity < quantity) {
        return res.status(400).json({ error: "insufficient product" });
      }

      // Update cart item
      const updatedCartItem = await prisma.cartItem.update({
        where: { cart_item_id: parseInt(cart_item_id) },
        data: { quantity },
      });

      res.status(200).json(updatedCartItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "failed to update item" });
    }
  }

  // Delete cart item
  async deleteCartItem(req: Request, res: Response): Promise<any> {
    const { cart_item_id } = req.params;

    try {
      await prisma.cartItem.delete({
        where: { cart_item_id: parseInt(cart_item_id) },
      });

      res.status(200).json({ message: "item deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "failed to delete item" });
    }
  }
}
