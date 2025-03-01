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
    this.route.post('/create', this.storeController.createStore);
    this.route.delete('/delete', this.storeController.deleteStore);
    this.route.patch('/update', this.storeController.updateStore);
    this.route.post('/get-distance', this.storeController.getStoreDistance);
  }

  public getRouter() {
    return this.route;
  }
}
