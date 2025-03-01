"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const upload_middleware_1 = require("../middleware/upload.middleware");
class OrderRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.orderController = new order_controller_1.OrderController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.post("/new", this.orderController.createOrder);
        this.route.post("/:order_id/payment-proof", upload_middleware_1.upload.single("proof"), this.orderController.uploadPaymentProof);
        this.route.get("/", this.orderController.getOrderList);
        this.route.get("/:order_id", this.orderController.getOrderById);
        this.route.post("/:order_id/cancel", this.orderController.cancelOrder);
        this.route.post("/:order_id/confirm", this.orderController.confirmOrder);
    }
    getRouter() {
        return this.route;
    }
}
exports.OrderRouter = OrderRouter;
