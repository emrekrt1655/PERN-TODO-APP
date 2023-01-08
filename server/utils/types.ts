import { Request } from "express";

export interface IUser {
  userId: string;
  userName: string;
  email: string;
  password: string;
}

export interface IDecodedToken {
  id?: string;
  user?: IUser;
  iat: number;
  exp: number;
}

export interface ITodo {
  todoId: string;
  text: string;
  todoUserId: string;
  todoDone: string;
}

export interface IReqAuth extends Request {
  user?: IUser;
}
