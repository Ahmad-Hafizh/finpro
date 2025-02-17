import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

export class ProductRouter {
  private route: Router;
  private productRouter: ProductController;

  constructor() {
    this.route = Router();
    this.productRouter = new ProductController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.get("/", this.productRouter.getProduct);
    this.route.post("/", this.productRouter.createProduct);
    this.route.patch("/delete", this.productRouter.deleteProduct);
  }

  public getRouter() {
    return this.route;
  }
}
