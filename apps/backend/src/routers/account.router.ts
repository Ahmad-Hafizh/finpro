import { Router } from 'express';
import { AccountController } from '../controllers/account.controller';
import { verifyToken } from '../middleware/verifyToken';
import { upload } from '../middleware/upload.middleware';

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
    this.route.post('/verify', verifyToken, this.accountController.verifyEmailsetPassword);

    this.route.post('/sign-in', this.accountController.signIn);
    this.route.post('/forgot-password', this.accountController.forgotPassword);
    this.route.post('/recover-password', this.accountController.resetPassword);

    this.route.post('/get-user-by-id', this.accountController.getUserById);
    this.route.post('/get-role', this.accountController.getRoleByEmail);
    this.route.post('/oauth-signup', this.accountController.createProfileReferral);

    this.route.patch('/update-user', this.accountController.updateUser);
    this.route.patch('/update-pfp', verifyToken, upload.single('profile_image'), this.accountController.updatePfp);
  }

  public getRouter() {
    return this.route;
  }
}
