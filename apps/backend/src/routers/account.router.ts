import { Router } from 'express';

class AccountRouter {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  private routes() {
    this.router.get('/', (req, res) => {
      res.send('Account Router');
    });
  }

  public getRouter() {
    this.routes();
    return this.router;
  }
}
export default AccountRouter;
