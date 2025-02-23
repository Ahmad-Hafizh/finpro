import { Router } from 'express';
import { StoreController } from '../controllers/store.controller';

export class StoreRouter {
  private route: Router;
  private storeController: StoreController;

  constructor() {
    this.route = Router();
    this.storeController = new StoreController();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.route.get('/get-store', this.storeController.findNearestStore);
  }

  public getRouter() {
    return this.route;
  }
}
