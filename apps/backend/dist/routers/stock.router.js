"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockRouter = void 0;
const express_1 = require("express");
const stock_controller_1 = require("../controllers/stock.controller");
const verifyToken_1 = require("../middleware/verifyToken");
class StockRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.stockRouter = new stock_controller_1.StockController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.post("/", verifyToken_1.verifyToken, this.stockRouter.createNewStock);
        this.route.patch("/", verifyToken_1.verifyToken, this.stockRouter.updateStock);
        this.route.patch("/zero", verifyToken_1.verifyToken, this.stockRouter.outOfStock);
        this.route.get("/store", this.stockRouter.getALLStore);
        // this.route.get("/", this.stockRouter.getStock);
    }
    getRouter() {
        return this.route;
    }
}
exports.StockRouter = StockRouter;
