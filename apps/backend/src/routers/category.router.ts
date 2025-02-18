import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
export class CategoryRouter {
  private route: Router;
  private categoryRouter: CategoryController;

  constructor() {
    this.route = Router();
    this.categoryRouter = new CategoryController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.get("/", this.categoryRouter.getCategory);
    this.route.post("/", this.categoryRouter.createCategory);
    this.route.patch("/", this.categoryRouter.updateCategory);
    this.route.patch("/delete", this.categoryRouter.deleteCategory);
    // this.route.post("/", this.productRouter.createProduct);
    // this.route.patch("/", this.adminController.updateAdmin);
  }

  public getRouter() {
    return this.route;
  }
}
