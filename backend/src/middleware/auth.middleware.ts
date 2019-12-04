import { JWT_SECRET } from '@/credentials';
import { NextFunction, Response } from 'express';
import {
  AuthenticationTokenMissingException,
  WrongAuthenticationTokenException,
  WrongAuthenticationKeyException,
} from '@/exceptions';
import { DataStoredInToken, RequestWithUser } from '@/interface/user-models';
import { userModel } from '@/models/user.model';
import * as jwt from 'jsonwebtoken';

export async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const authorization = request.headers.authorization;
  if (authorization) {
    const auth = authorization.split(' ', 2);
    const token = auth[0];
    const tokenValue = auth[1];
    if (token === 'token' && tokenValue) {
      try {
        const verificationResponse = jwt.verify(tokenValue, JWT_SECRET) as DataStoredInToken;
        const id = verificationResponse._id;
        const user = await userModel.findById(id);
        if (user) {
          request.user = user;
          next();
        } else {
          next(new WrongAuthenticationTokenException());
        }
      } catch (error) {
        const data = new WrongAuthenticationTokenException();
        response.status(data.status).send({ message: data.message, status: data.status });
      }
    } else {
      const data = new WrongAuthenticationKeyException();
      response.status(data.status).send({ message: data.message, status: data.status });
    }
  } else {
    const data = new AuthenticationTokenMissingException();
    response.status(data.status).json({ message: data.message, status: data.status });
  }
}
