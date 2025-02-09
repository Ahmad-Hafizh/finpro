import { Router } from 'express';
import { AccountController } from '../controllers/account.controller';
import { verifyToken } from '../middleware/verifyToken';

export class AccountRouter {
  private route: Router;
  private accountController: AccountController;

  constructor() {
    this.route = Router();
    this.accountController = new AccountController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.post('/sign-up', this.accountController.signUp);
    this.route.get('/verify', verifyToken, this.accountController.verifyEmailsetPassword);
  }

  public getRouter() {
    return this.route;
  }
}
