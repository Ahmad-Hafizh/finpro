import { Router } from "express";
import { StockController } from "../controllers/stock.controller";
import { verifyToken } from "../middleware/verifyToken";
import authGuard from "../middleware/authGuard";

export class StockRouter {
  private route: Router;
  private stockRouter: StockController;

  constructor() {
    this.route = Router();
    this.stockRouter = new StockController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.post("/", verifyToken, this.stockRouter.createNewStock);
    this.route.patch("/", verifyToken, this.stockRouter.updateStock);
    this.route.patch("/zero", verifyToken, this.stockRouter.outOfStock);
    this.route.get("/store", this.stockRouter.getALLStore);
    // this.route.get("/", this.stockRouter.getStock);
  }

  public getRouter() {
    return this.route;
  }
}
