"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const authGuard_1 = __importDefault(require("../middleware/authGuard"));
class CategoryRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.categoryRouter = new category_controller_1.CategoryController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.get("/", this.categoryRouter.getCategory);
        this.route.post("/", verifyToken_1.verifyToken, authGuard_1.default.superAdmin, this.categoryRouter.createCategory);
        this.route.patch("/", verifyToken_1.verifyToken, authGuard_1.default.superAdmin, this.categoryRouter.updateCategory);
        this.route.patch("/delete", verifyToken_1.verifyToken, authGuard_1.default.superAdmin, this.categoryRouter.deleteCategory);
        // this.route.post("/", this.productRouter.createProduct);
        // this.route.patch("/", this.adminController.updateAdmin);
    }
    getRouter() {
        return this.route;
    }
}
exports.CategoryRouter = CategoryRouter;
