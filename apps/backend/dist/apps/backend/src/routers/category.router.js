"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
class CategoryRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.categoryRouter = new category_controller_1.CategoryController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.get("/", this.categoryRouter.getCategory);
        this.route.post("/", this.categoryRouter.createCategory);
        this.route.patch("/", this.categoryRouter.updateCategory);
        this.route.patch("/delete", this.categoryRouter.deleteCategory);
        // this.route.post("/", this.productRouter.createProduct);
        // this.route.patch("/", this.adminController.updateAdmin);
    }
    getRouter() {
        return this.route;
    }
}
exports.CategoryRouter = CategoryRouter;
