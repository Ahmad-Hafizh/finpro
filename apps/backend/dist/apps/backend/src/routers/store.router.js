"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreRouter = void 0;
const express_1 = require("express");
const store_controller_1 = require("../controllers/store.controller");
class StoreRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.storeController = new store_controller_1.StoreController();
        this.initializeRoute();
    }
    initializeRoute() {
        this.route.get('/get-store', this.storeController.findNearestStore);
    }
    getRouter() {
        return this.route;
    }
}
exports.StoreRouter = StoreRouter;
