import * as express from 'express';
import { CreateUserDto } from '@/models/user.dto';
import { validationMiddleware } from '@/middleware/validation.middleware';
import { LogInDto } from '@/models/user.model';
import { authController } from '@/controllers';


export class AuthRoute {
  public path = '/auth';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/register`, validationMiddleware(CreateUserDto), authController.registration);
    this.router.post(`/login`, validationMiddleware(LogInDto), authController.loggingIn);
    this.router.post(`/logout`, authController.loggingOut);
  }

}
