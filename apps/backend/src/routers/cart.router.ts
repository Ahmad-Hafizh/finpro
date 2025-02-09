import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';

export class CartRouter {
  private route: Router;
  private cartController: CartController;

  constructor() {
    this.route = Router();
    this.cartController = new CartController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post('/', this.cartController.addToCart);
    this.route.get('/items', this.cartController.getCartItems);
    this.route.get('/count', this.cartController.getCartItemsCount);
    this.route.patch('/:cart_item_id', this.cartController.updateCartItem);
    this.route.delete('/:cart_item_id', this.cartController.deleteCartItem);
  }

  public getRouter(): Router {
    return this.route;
  }
}
