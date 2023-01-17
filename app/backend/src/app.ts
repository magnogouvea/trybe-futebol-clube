import * as express from 'express';
import 'express-async-errors';
import error from './middleware/loginError';
import LoginRouter from './routes/loginRouter';
import TeamsRouter from './routes/teamsRouter';
import MatchRouter from './routes/matchesRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.error();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/login', LoginRouter);
    this.app.use('/teams', TeamsRouter);
    this.app.use('/matches', MatchRouter);
  }

  private error():void {
    this.app.use(error);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;

export const { app } = new App();
