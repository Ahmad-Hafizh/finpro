import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { upload } from "../middleware/upload.middleware";
import { verifyToken } from "../middleware/verifyToken";
import authGuard from "../middleware/authGuard";

export class ProductRouter {
  private route: Router;
  private productRouter: ProductController;

  constructor() {
    this.route = Router();
    this.productRouter = new ProductController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.get("/dropdown", this.productRouter.getProductDropdown);
    this.route.get("/", this.productRouter.getProduct);
    this.route.post(
      "/",
      upload.array("product_image", 5),
      verifyToken,
      authGuard.superAdmin,
      this.productRouter.createProduct
    );
    this.route.patch(
      "/delete",
      verifyToken,
      authGuard.superAdmin,
      this.productRouter.deleteProduct
    );
    this.route.get("/:name", this.productRouter.getDetailedProduct);
  }

  public getRouter() {
    return this.route;
  }
}
