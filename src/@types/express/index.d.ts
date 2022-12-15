import * as express from "express";
import { IUserUpdate } from "../../interfaces/users";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        isAdm: boolean;
      };
    }
  }
}
