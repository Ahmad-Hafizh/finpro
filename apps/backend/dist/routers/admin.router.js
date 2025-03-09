"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const authGuard_1 = __importDefault(require("../middleware/authGuard"));
class AdminRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.adminController = new admin_controller_1.AdminController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.get("/", this.adminController.getAdmin);
        this.route.post("/detail", this.adminController.checkAdminDetailRoleFromFrontend);
        this.route.patch("/", verifyToken_1.verifyToken, authGuard_1.default.superAdmin, this.adminController.updateAdmin);
        this.route.post("/create", verifyToken_1.verifyToken, authGuard_1.default.superAdmin, this.adminController.createAdmin);
        this.route.post("/assign-store", this.adminController.assignStoreAdmin);
        this.route.patch("/delete", verifyToken_1.verifyToken, authGuard_1.default.superAdmin, this.adminController.deleteAdmin);
    }
    getRouter() {
        return this.route;
    }
}
exports.AdminRouter = AdminRouter;
