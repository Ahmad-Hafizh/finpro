"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRouter = void 0;
const express_1 = require("express");
const address_controller_1 = require("../controllers/address.controller");
class AddressRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.addressController = new address_controller_1.AddressController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.get("/", (req, res) => this.addressController.getAddresses(req, res));
    }
    getRouter() {
        return this.route;
    }
}
exports.AddressRouter = AddressRouter;
