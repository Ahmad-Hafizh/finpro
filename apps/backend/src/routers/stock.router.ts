import { Router } from "express";
import { StockController } from "../controllers/stock.controller";

export class StockRouter {
  private route: Router;
  private stockRouter: StockController;

  constructor() {
    this.route = Router();
    this.stockRouter = new StockController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.post("/", this.stockRouter.createNewStock);
    this.route.patch("/", this.stockRouter.updateStock);
    this.route.patch("/zero", this.stockRouter.outOfStock);
    this.route.get("/store", this.stockRouter.getALLStore);
    // this.route.get("/", this.stockRouter.getStock);
  }

  public getRouter() {
    return this.route;
  }
}
