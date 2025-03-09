"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const upload_middleware_1 = require("../middleware/upload.middleware");
const verifyToken_1 = require("../middleware/verifyToken");
class OrderRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.orderController = new order_controller_1.OrderController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.post("/new", verifyToken_1.verifyToken, this.orderController.createOrder);
        this.route.post("/:order_id/payment-proof", verifyToken_1.verifyToken, upload_middleware_1.upload.single("proof"), this.orderController.uploadPaymentProof);
        this.route.get("/", verifyToken_1.verifyToken, this.orderController.getOrderList);
        this.route.get("/:order_id", verifyToken_1.verifyToken, this.orderController.getOrderById);
        this.route.post("/:order_id/cancel", verifyToken_1.verifyToken, this.orderController.cancelOrder);
        this.route.post("/:order_id/confirm", verifyToken_1.verifyToken, this.orderController.confirmOrder);
    }
    getRouter() {
        return this.route;
    }
}
exports.OrderRouter = OrderRouter;
