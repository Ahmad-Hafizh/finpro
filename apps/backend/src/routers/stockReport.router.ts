import { Router } from "express";
import { StockReportController } from "../controllers/stockReport.controller";

export class StockReportRouter {
  private route: Router;
  private stockReportRouter: StockReportController;

  constructor() {
    this.route = Router();
    this.stockReportRouter = new StockReportController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.get("/", this.stockReportRouter.getStockReport);
    this.route.get("/total", this.stockReportRouter.getStockReportTotal);
  }

  public getRouter() {
    return this.route;
  }
}
