import cron from "node-cron";
import { OrderController } from "../controllers/order.controller";

const orderController = new OrderController();

cron.schedule("* * * * *", async () => {
  await orderController.autoCancelOrders();
  console.log("autoCancelOrders executed at", new Date().toLocaleString());
});

cron.schedule("* * * * *", async () => {
  await orderController.autoConfirmOrders();
  console.log("autoConfirmOrders executed at", new Date().toLocaleString());
});
