import cron from "node-cron";
import { OrderController } from "../controllers/order.controller";

const orderController = new OrderController();

cron.schedule("* * * * *", async () => {
  await orderController.autoCancelOrders();
});

cron.schedule("* * * * *", async () => {
  await orderController.autoConfirmOrders();
});
