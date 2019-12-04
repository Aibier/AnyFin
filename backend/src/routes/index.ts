import { AuthRoute } from './auth';
import { authMiddleware } from '@/middleware/auth.middleware';
import { logger } from '@/services';
import { NextFunction, Request, Response, Router } from 'express';
import { CountryRoute } from './country';

export class ApiRoutes {
  public static path = '/api';
  private static instance: ApiRoutes;
  private router = Router();

  private constructor() {
    logger.info('[ApiRoute] Creating api routes.');
    const authRoute = new AuthRoute();
    this.router.get('/', this.get);
    this.router.use(authRoute.path, authRoute.router);
    this.router.use(CountryRoute.path, authMiddleware, CountryRoute.router);
  }

  static get router() {
    if (!ApiRoutes.instance) {
      ApiRoutes.instance = new ApiRoutes();
    }
    return ApiRoutes.instance.router;
  }

  private get = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ online: true });
    next();
  };
}
