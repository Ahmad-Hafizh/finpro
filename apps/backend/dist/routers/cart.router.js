"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRouter = void 0;
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
const verifyToken_1 = require("../middleware/verifyToken");
class CartRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.cartController = new cart_controller_1.CartController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.post("/", verifyToken_1.verifyToken, this.cartController.addToCart);
        this.route.get("/items", verifyToken_1.verifyToken, this.cartController.getCartItems);
        this.route.get("/count", verifyToken_1.verifyToken, this.cartController.getCartItemsCount);
        this.route.patch("/:cart_item_id", verifyToken_1.verifyToken, this.cartController.updateCartItem);
        this.route.delete("/:cart_item_id", verifyToken_1.verifyToken, this.cartController.deleteCartItem);
    }
    getRouter() {
        return this.route;
    }
}
exports.CartRouter = CartRouter;
