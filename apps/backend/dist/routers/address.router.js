"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRouter = void 0;
const express_1 = require("express");
const address_controller_1 = require("../controllers/address.controller");
const verifyToken_1 = require("../middleware/verifyToken");
class AddressRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.addressController = new address_controller_1.AddressController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.get('/', verifyToken_1.verifyToken, (req, res) => this.addressController.getAddresses(req, res));
        this.route.get('/', verifyToken_1.verifyToken, this.addressController.getAddresses);
        this.route.post('/ongkir', this.addressController.getOngkir);
        this.route.get('/get-address', verifyToken_1.verifyToken, this.addressController.getAddresses);
        this.route.post('/set-address', this.addressController.setDeliveryAddress);
        this.route.patch('/update-address', this.addressController.updateDeliveryAddress);
        this.route.delete('/del-address/:address_id', verifyToken_1.verifyToken, this.addressController.deleteAddress);
        this.route.get('/get-address/:address_id', verifyToken_1.verifyToken, this.addressController.getAddressDetail);
    }
    getRouter() {
        return this.route;
    }
}
exports.AddressRouter = AddressRouter;
