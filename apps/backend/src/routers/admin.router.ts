import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { verifyToken } from "../middleware/verifyToken";
import authGuard from "../middleware/authGuard";

export class AdminRouter {
  private route: Router;
  private adminController: AdminController;

  constructor() {
    this.route = Router();
    this.adminController = new AdminController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.get("/", this.adminController.getAdmin);
    this.route.post(
      "/detail",
      this.adminController.checkAdminDetailRoleFromFrontend
    );
    this.route.patch(
      "/",
      verifyToken,
      authGuard.superAdmin,
      this.adminController.updateAdmin
    );
    this.route.post("/create", this.adminController.createAdmin);
    this.route.post("/assign-store", this.adminController.assignStoreAdmin);
  }

  public getRouter() {
    return this.route;
  }
}
