import { Router } from 'express';
import { StoreController } from '../controllers/store.controller';
import { verifyToken } from '../middleware/verifyToken';
import authGuard from '../middleware/authGuard';

export class StoreRouter {
  private route: Router;
  private storeController: StoreController;

  constructor() {
    this.route = Router();
    this.storeController = new StoreController();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.route.get('/', this.storeController.getAllStore);
    this.route.get('/get-store', this.storeController.findNearestStore);
    this.route.post('/create', verifyToken, authGuard.superAdmin, this.storeController.createStore);
    this.route.patch('/update', verifyToken, authGuard.superAdmin, this.storeController.updateStore);
    this.route.post('/get-distance', this.storeController.getStoreDistance);
    this.route.post('/get-store-by-name', this.storeController.getStoreByName);
    this.route.delete('/delete/:store_id', verifyToken, authGuard.superAdmin, this.storeController.deleteStore);
  }

  public getRouter() {
    return this.route;
  }
}
