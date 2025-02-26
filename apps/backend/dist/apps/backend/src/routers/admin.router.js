"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
class AdminRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.adminController = new admin_controller_1.AdminController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.get("/", this.adminController.getAdmin);
        this.route.patch("/", this.adminController.updateAdmin);
    }
    getRouter() {
        return this.route;
    }
}
exports.AdminRouter = AdminRouter;
