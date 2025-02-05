import express, { Application, Request, Response } from 'express';
import cors from 'cors';

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
    this.app.get('/', (req: Request, res: Response): any => {
      return res.status(200).send('test api');
    });
  }

  public start() {
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

export default new App();
