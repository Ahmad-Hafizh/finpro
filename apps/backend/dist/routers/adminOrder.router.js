"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminOrderRouter = void 0;
const express_1 = require("express");
const adminOrder_controller_1 = require("../controllers/adminOrder.controller");
const verifyToken_1 = require("../middleware/verifyToken");
class AdminOrderRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.adminOrderController = new adminOrder_controller_1.AdminOrderController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.get("/", verifyToken_1.verifyToken, this.adminOrderController.getAllOrders);
        this.route.post("/:order_id/confirm-payment", verifyToken_1.verifyToken, this.adminOrderController.confirmPayment);
        this.route.post("/:order_id/send", verifyToken_1.verifyToken, this.adminOrderController.sendUserOrder);
        this.route.post("/:order_id/cancel", verifyToken_1.verifyToken, this.adminOrderController.cancelUserOrder);
    }
    getRouter() {
        return this.route;
    }
}
exports.AdminOrderRouter = AdminOrderRouter;
