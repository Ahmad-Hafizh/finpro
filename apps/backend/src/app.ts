import express, { Application, Request, Response } from "express";
import cors from "cors";
import { prisma } from "../../../packages/database/src/client";
import { CartRouter } from "./routers/cart.router";

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
    const cartRouter = new CartRouter();
    this.app.get("/", (req: Request, res: Response): any => {
      return res.status(200).send("test api");
    });
    this.app.use("/cart", cartRouter.getRouter());
  }

  public start() {
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

export default new App();
