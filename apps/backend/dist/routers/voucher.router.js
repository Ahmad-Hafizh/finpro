"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherRouter = void 0;
const express_1 = require("express");
const voucher_controller_1 = require("../controllers/voucher.controller");
const verifyToken_1 = require("../middleware/verifyToken");
class VoucherRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.voucherController = new voucher_controller_1.VoucherController();
        this.initializeRoute();
    }
    initializeRoute() {
        this.route.get('/', this.voucherController.getAllVoucher);
        this.route.post('/ongkir', verifyToken_1.verifyToken, this.voucherController.createNewOngkirVoucher);
        this.route.post('/product', verifyToken_1.verifyToken, this.voucherController.createNewProductVoucher);
        this.route.post('/store', verifyToken_1.verifyToken, this.voucherController.createNewStoreVoucher);
        // this.route.get('/order', this.voucherController.getVoucherTwo);
        this.route.get('/banner', this.voucherController.getBanner);
        this.route.get('/available', verifyToken_1.verifyToken, this.voucherController.getVouchers);
    }
    getRouter() {
        return this.route;
    }
}
exports.VoucherRouter = VoucherRouter;
