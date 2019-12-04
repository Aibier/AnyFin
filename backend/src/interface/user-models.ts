import { Request } from 'express';

export interface AuthCredential {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  _id: string;
}

export interface LoginUser {
  name: string;
  email: string;
  _id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface DataStoredInToken {
  _id: string;
}

export interface RequestWithUser extends Request {
  user: LoginUser;
}
