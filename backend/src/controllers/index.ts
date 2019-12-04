import { JWT_SECRET } from "@/credentials";
import * as express from 'express';
import {LogInDto, userModel as UserModel} from "@/models/user.model";
import { CreateUserDto } from "@/models/user.dto";
import { UserWithThatEmailAlreadyExistsException, WrongCredentialsException } from "@/exceptions";
import * as bcrypt from "bcrypt";
import { DataStoredInToken, TokenData, User } from "@/interface/user-models";
import * as jwt from 'jsonwebtoken';

export const authController = {

    registration: async (request: express.Request, response: express.Response, next: express.NextFunction) => {
      const userData: CreateUserDto = request.body;
      const resUser = await UserModel.findOne({ email: userData.email });
      if (resUser) {
        const data = new UserWithThatEmailAlreadyExistsException(userData.email);
        response.status(data.status).send({ message: data.message, status: data.status });
      } else {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await UserModel.create({
          ...userData,
          password: hashedPassword,
        });
        user.password = undefined;
        const tokenData = authController.createToken(user);
        response.setHeader('Set-Cookie', [authController.createCookie(tokenData)]);
        response.send(user);
      }
    },

    loggingIn:  async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const logInData: LogInDto = request.body;
        const user = await UserModel.findOne({ email: logInData.email });
        if (user) {
          const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
          if (isPasswordMatching) {
            user.password = undefined;
            const tokenData = authController.createToken(user);
            response.setHeader('Set-Cookie', [authController.createCookie(tokenData)]);
            tokenData['user'] = user;
            response.send(tokenData);
          } else {
            const data = new WrongCredentialsException();
            response.status(data.status).send({ message: data.message, status: data.status });
          }
        } else {
          const data = new WrongCredentialsException();
          response.status(data.status).send({ message: data.message, status: data.status });
        }
    },

    createCookie: (tokenData: TokenData) => {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    },

    createToken: (user: User): TokenData => {
        const expiresIn = 60 * 60; // an hour
        const secret = JWT_SECRET;
        const dataStoredInToken: DataStoredInToken = {
          _id: user._id,
        };
        return {
          expiresIn,
          token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    },

    loggingOut: (request: express.Request, response: express.Response) => {
        response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
        response.status(200).send(200);
    },
};

