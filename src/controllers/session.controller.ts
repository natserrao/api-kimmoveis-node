import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/users";
import sessionLoginService from "../services/session/sessionLogin.service";

export const sessionLoginController = async (req: Request, res: Response) => {
  const { email, password }: IUserLogin = req.body;
  const token = await sessionLoginService({ email, password });
  return res.status(200).json({ token });
};
