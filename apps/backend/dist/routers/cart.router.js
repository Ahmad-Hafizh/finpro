"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRouter = void 0;
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
class CartRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.cartController = new cart_controller_1.CartController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.post('/', this.cartController.addToCart);
        this.route.get('/items', this.cartController.getCartItems);
        this.route.get('/count', this.cartController.getCartItemsCount);
        this.route.patch('/:cart_item_id', this.cartController.updateCartItem);
        this.route.delete('/:cart_item_id', this.cartController.deleteCartItem);
    }
    getRouter() {
        return this.route;
    }
}
exports.CartRouter = CartRouter;
