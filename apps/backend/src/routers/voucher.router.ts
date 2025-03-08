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
    this.route.get(
      "/available",
      verifyToken,
      this.voucherController.getVouchers.bind(this.voucherController)
    );

    this.route.get("/", this.voucherController.getAllVoucher);
    this.route.post("/ongkir", this.voucherController.createNewOngkirVoucher);
    this.route.post("/product", this.voucherController.createNewProductVoucher);
    this.route.post("/store", this.voucherController.createNewStoreVoucher);
  }

  public getRouter() {
    return this.route;
  }
}
