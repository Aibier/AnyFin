import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { HOST, MONGO_DB, MONGO_USER, MONGO_PASSWORD, PORT } from '@/credentials';
import * as express from 'express';
import * as expressStatusMonitor from 'express-status-monitor';
import * as helmet from 'helmet';
import * as methodOverride from 'method-override';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import { ApiRoutes } from './routes';
import { logger } from './services';
import * as rateLimit from 'express-rate-limit';

export class Server {
  public static bootstrap(): Server {
    return new Server();
  }
  public app: express.Application;
  private readonly mongoPath = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${HOST}:${PORT}/${MONGO_DB}`;

  constructor() {
    this.app = express();
    this.config();
    this.connectToTheDatabase();
    this.routes();
  }

  public config() {
    // mount logger
    this.app.use(
      morgan('tiny', {
        stream: {
          write: (message: string) => logger.info(message.trim()),
        },
      } as morgan.Options),
    );
    this.app.use(rateLimit({ max: 30 }));
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(methodOverride());
    this.app.use(expressStatusMonitor());
  }

  private routes() {
    // use router middleware
    this.app.use(ApiRoutes.path, ApiRoutes.router);
  }

  private connectToTheDatabase() {
    mongoose.connect(this.mongoPath, { useNewUrlParser: true }, { useUnifiedTopology: true }).catch(err => {
      logger.info(err);
    });
  }
}
