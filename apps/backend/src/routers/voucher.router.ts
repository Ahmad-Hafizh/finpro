import { Router } from "express";
import { VoucherController } from "../controllers/voucher.controller";
import { verifyToken } from "../middleware/verifyToken";

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
    this.route.post(
      "/ongkir",
      verifyToken,
      this.voucherController.createNewOngkirVoucher
    );
    this.route.post(
      "/product",
      verifyToken,
      this.voucherController.createNewProductVoucher
    );
    this.route.post(
      "/store",
      verifyToken,
      this.voucherController.createNewStoreVoucher
    );
    this.route.get("/order", this.voucherController.getVoucherTwo);
  }

  public getRouter() {
    return this.route;
  }
}
