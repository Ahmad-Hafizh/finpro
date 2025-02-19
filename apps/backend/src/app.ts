import express, { Application, Request, Response } from "express";
import cors from "cors";
import { prisma } from "../../../packages/database/src/client";
import { CartRouter } from "./routers/cart.router";
import { AccountRouter } from "./routers/account.router";
import { AdminRouter } from "./routers/admin.router";
import { ProductRouter } from "./routers/product.router";
import { CategoryRouter } from "./routers/category.router";
import { OrderRouter } from "./routers/order.router";
import { AddressRouter } from "./routers/address.router";

const PORT = 8090;
class App {
  readonly app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes() {
    this.app.get("/", (req: Request, res: Response): any => {
      return res.status(200).send("test api");
    });

    const accountRouter = new AccountRouter();
    this.app.use("/account", accountRouter.getRouter());

    const cartRouter = new CartRouter();
    this.app.use("/cart", cartRouter.getRouter());

    const adminRouter = new AdminRouter();
    this.app.use("/admin", adminRouter.getRouter());

    const productRouter = new ProductRouter();
    this.app.use("/product", productRouter.getRouter());

    const categoryRouter = new CategoryRouter();
    this.app.use("/category", categoryRouter.getRouter());

    const orderRouter = new OrderRouter();
    this.app.use("/order", orderRouter.getRouter());
    const addressRouter = new AddressRouter();
    this.app.use("/address", addressRouter.getRouter());
  }

  public start() {
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

export default new App();
