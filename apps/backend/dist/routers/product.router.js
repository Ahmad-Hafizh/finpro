"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const upload_middleware_1 = require("../middleware/upload.middleware");
class ProductRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.productRouter = new product_controller_1.ProductController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.get("/", this.productRouter.getProduct);
        this.route.post("/", upload_middleware_1.upload.array("product_image", 5), this.productRouter.createProduct);
        this.route.patch("/delete", this.productRouter.deleteProduct);
        this.route.get("/:name", this.productRouter.getDetailedProduct);
    }
    getRouter() {
        return this.route;
    }
}
exports.ProductRouter = ProductRouter;
