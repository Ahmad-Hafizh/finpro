import { Router } from 'express';
import { AddressController } from '../controllers/address.controller';
import { verifyToken } from '../middleware/verifyToken';

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
    this.route.get('/get-address', verifyToken, this.addressController.getAddresses);
    this.route.post('/ongkir', this.addressController.getOngkir);

    this.route.post('/set-address', this.addressController.setDeliveryAddress);
    this.route.patch('/update-address', this.addressController.updateDeliveryAddress);
    this.route.delete('/del-address/:address_id', verifyToken, this.addressController.deleteAddress);

    this.route.get('/get-address/:address_id', verifyToken, this.addressController.getAddressDetail);
  }

  public getRouter(): Router {
    return this.route;
  }
}
