import { Router } from "express";
import { VoucherController } from "../controllers/voucher.controller";

export class VoucherRouter {
  private route: Router;
  private voucherController: VoucherController;

  constructor() {
    this.route = Router();
    this.voucherController = new VoucherController();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.route.get("/", this.voucherController.getAllVoucher);
    this.route.post("/ongkir", this.voucherController.createNewOngkirVoucher);
    this.route.post("/product", this.voucherController.createNewProductVoucher);
    this.route.post("/store", this.voucherController.createNewStoreVoucher);
  }

  public getRouter() {
    return this.route;
  }
}
