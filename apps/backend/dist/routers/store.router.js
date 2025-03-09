"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreRouter = void 0;
const express_1 = require("express");
const store_controller_1 = require("../controllers/store.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const authGuard_1 = __importDefault(require("../middleware/authGuard"));
class StoreRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.storeController = new store_controller_1.StoreController();
        this.initializeRoute();
    }
    initializeRoute() {
        this.route.get('/', this.storeController.getAllStore);
        this.route.get('/get-store', this.storeController.findNearestStore);
        this.route.post('/create', verifyToken_1.verifyToken, authGuard_1.default.superAdmin, this.storeController.createStore);
        this.route.delete('/delete/:store_id', verifyToken_1.verifyToken, authGuard_1.default.superAdmin, this.storeController.deleteStore);
        this.route.patch('/update', verifyToken_1.verifyToken, authGuard_1.default.superAdmin, this.storeController.updateStore);
        this.route.post('/get-distance', this.storeController.getStoreDistance);
        this.route.post('/get-store-by-name', this.storeController.getStoreByName);
        this.route.post('/get-id', this.storeController.getStoreById);
    }
    getRouter() {
        return this.route;
    }
}
exports.StoreRouter = StoreRouter;
