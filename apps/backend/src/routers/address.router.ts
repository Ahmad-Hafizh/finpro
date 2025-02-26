import { Router } from 'express';
import { AddressController } from '../controllers/address.controller';

export class AddressRouter {
  private route: Router;
  private addressController: AddressController;

  constructor() {
    this.route = Router();
    this.addressController = new AddressController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.get('/', (req, res) => this.addressController.getAddresses(req, res));
    this.route.post('/get-address', this.addressController.getAddresses);
    this.route.post('/set-address', this.addressController.setDeliveryAddress);
    this.route.patch('/update-address', this.addressController.updateDeliveryAddress);
  }

  public getRouter(): Router {
    return this.route;
  }
}
