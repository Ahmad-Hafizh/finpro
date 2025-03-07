import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { upload } from "../middleware/upload.middleware";
import { verifyToken } from "../middleware/verifyToken";

export class OrderRouter {
  private route: Router;
  private orderController: OrderController;

  constructor() {
    this.route = Router();
    this.orderController = new OrderController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post("/new", verifyToken, this.orderController.createOrder);
    this.route.post(
      "/:order_id/payment-proof",
      verifyToken,
      upload.single("proof"),
      this.orderController.uploadPaymentProof
    );
    this.route.get("/", verifyToken, this.orderController.getOrderList);
    this.route.get(
      "/:order_id",
      verifyToken,
      this.orderController.getOrderById
    );
    this.route.post(
      "/:order_id/cancel",
      verifyToken,
      this.orderController.cancelOrder
    );
    this.route.post(
      "/:order_id/confirm",
      verifyToken,
      this.orderController.confirmOrder
    );
  }

  public getRouter(): Router {
    return this.route;
  }
}
