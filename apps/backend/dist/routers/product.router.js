"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const upload_middleware_1 = require("../middleware/upload.middleware");
const verifyToken_1 = require("../middleware/verifyToken");
const authGuard_1 = __importDefault(require("../middleware/authGuard"));
class ProductRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.productRouter = new product_controller_1.ProductController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.get("/dropdown", this.productRouter.getProductDropdown);
        this.route.get("/", this.productRouter.getProduct);
        this.route.post("/", upload_middleware_1.upload.array("product_image", 5), verifyToken_1.verifyToken, authGuard_1.default.superAdmin, this.productRouter.createProduct);
        this.route.patch("/update", upload_middleware_1.upload.array("product_image", 5), verifyToken_1.verifyToken, authGuard_1.default.superAdmin, this.productRouter.updateProduct);
        this.route.patch("/delete", verifyToken_1.verifyToken, authGuard_1.default.superAdmin, this.productRouter.deleteProduct);
        this.route.get("/landing", this.productRouter.getLandingProduct);
        this.route.get("/:name", this.productRouter.getDetailedProduct);
    }
    getRouter() {
        return this.route;
    }
}
exports.ProductRouter = ProductRouter;
