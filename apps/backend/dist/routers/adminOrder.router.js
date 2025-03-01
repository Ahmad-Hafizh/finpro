"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminOrderRouter = void 0;
const express_1 = require("express");
const adminOrder_controller_1 = require("../controllers/adminOrder.controller");
class AdminOrderRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.adminOrderController = new adminOrder_controller_1.AdminOrderController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.get("/", this.adminOrderController.getAllOrders);
        this.route.post("/:order_id/confirm-payment", this.adminOrderController.confirmPayment);
        this.route.post("/:order_id/send", this.adminOrderController.sendUserOrder);
        this.route.post("/:order_id/cancel", this.adminOrderController.cancelUserOrder);
    }
    getRouter() {
        return this.route;
    }
}
exports.AdminOrderRouter = AdminOrderRouter;
