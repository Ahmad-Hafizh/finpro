import { Request, Response } from "express";
import { addToCartService } from "../services/cart/addToCart";
import { getCartItemsCountService } from "../services/cart/getCartItemCount";
import { getCartItemsService } from "../services/cart/getCartItems";
import { updateCartItemService } from "../services/cart/updateCartItems";
import { deleteCartItemService } from "../services/cart/deleteCartItem";

export class CartController {
  async addToCart(req: Request, res: Response): Promise<any> {
    const { product_id, quantity } = req.body;
    const userId = res.locals.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    try {
      const cartItem = await addToCartService({
        userId,
        product_id,
        quantity,
      });
      return res.status(cartItem ? 200 : 201).json(cartItem);
    } catch (error: any) {
      console.error("Add To Cart Error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Failed to add to cart" });
    }
  }

  async getCartItemsCount(req: Request, res: Response): Promise<any> {
    const userId = res.locals.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    try {
      const result = await getCartItemsCountService(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Get Cart Items Count Error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Failed to get item count" });
    }
  }

  async getCartItems(req: Request, res: Response): Promise<any> {
    const userId = res.locals.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    try {
      const result = await getCartItemsService(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Get Cart Items Error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Failed to get items" });
    }
  }

  async updateCartItem(req: Request, res: Response): Promise<any> {
    const { cart_item_id } = req.params;
    const { quantity } = req.body;

    try {
      const updatedCartItem = await updateCartItemService({
        cart_item_id: parseInt(cart_item_id, 10),
        quantity,
      });
      return res.status(200).json(updatedCartItem);
    } catch (error: any) {
      console.error("Update Cart Item Error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Failed to update item" });
    }
  }

  async deleteCartItem(req: Request, res: Response): Promise<any> {
    const { cart_item_id } = req.params;

    try {
      const result = await deleteCartItemService(parseInt(cart_item_id, 10));
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Delete Cart Item Error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Failed to delete item" });
    }
  }
}
