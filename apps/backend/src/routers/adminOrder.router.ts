import { Router } from "express";
import { AdminOrderController } from "../controllers/adminOrder.controller";
import { verifyToken } from "../middleware/verifyToken";

export class AdminOrderRouter {
  private route: Router;
  private adminOrderController: AdminOrderController;

  constructor() {
    this.route = Router();
    this.adminOrderController = new AdminOrderController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.get("/", verifyToken, this.adminOrderController.getAllOrders);
    this.route.post(
      "/:order_id/confirm-payment",
      verifyToken,
      this.adminOrderController.confirmPayment
    );
    this.route.post(
      "/:order_id/send",
      verifyToken,
      this.adminOrderController.sendUserOrder
    );
    this.route.post(
      "/:order_id/cancel",
      verifyToken,
      this.adminOrderController.cancelUserOrder
    );
  }

  public getRouter(): Router {
    return this.route;
  }
}
