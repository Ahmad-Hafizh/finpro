import { Router } from "express";
import { CartController } from "../controllers/cart.controller";
import { verifyToken } from "../middleware/verifyToken";

export class CartRouter {
  private route: Router;
  private cartController: CartController;

  constructor() {
    this.route = Router();
    this.cartController = new CartController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post("/", verifyToken, this.cartController.addToCart);
    this.route.get("/items", verifyToken, this.cartController.getCartItems);
    this.route.get(
      "/count",
      verifyToken,
      this.cartController.getCartItemsCount
    );
    this.route.patch(
      "/:cart_item_id",
      verifyToken,
      this.cartController.updateCartItem
    );
    this.route.delete(
      "/:cart_item_id",
      verifyToken,
      this.cartController.deleteCartItem
    );
  }

  public getRouter(): Router {
    return this.route;
  }
}
