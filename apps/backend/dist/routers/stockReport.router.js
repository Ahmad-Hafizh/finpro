"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockReportRouter = void 0;
const express_1 = require("express");
const stockReport_controller_1 = require("../controllers/stockReport.controller");
class StockReportRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.stockReportRouter = new stockReport_controller_1.StockReportController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.get("/", this.stockReportRouter.getStockReport);
        this.route.get("/total", this.stockReportRouter.getStockReportTotal);
    }
    getRouter() {
        return this.route;
    }
}
exports.StockReportRouter = StockReportRouter;
