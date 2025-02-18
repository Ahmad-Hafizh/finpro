import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { upload } from "../middleware/upload.middleware";

export class OrderRouter {
  private route: Router;
  private orderController: OrderController;

  constructor() {
    this.route = Router();
    this.orderController = new OrderController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post("/new", this.orderController.createOrder);
    this.route.post(
      "/:order_id/payment-proof",
      upload.single("proof"),
      this.orderController.uploadPaymentProof
    );
    this.route.get("/", this.orderController.getOrderList);
    this.route.post("/:order_id/cancel", this.orderController.cancelOrder);
    this.route.post("/:order_id/confirm", this.orderController.confirmOrder);
  }

  public getRouter(): Router {
    return this.route;
  }
}
