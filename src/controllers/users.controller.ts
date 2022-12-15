import { Request, Response } from "express";
import { IUserRequest, IUserUpdate } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import listAllUsersService from "../services/users/listAllUsers.service";
import { instanceToPlain } from "class-transformer";
import updateUserService from "../services/users/updateUser.service";
import softDeleteUserService from "../services/users/softdeleteUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const createdUser = await createUserService(user);
  return res.status(201).json(instanceToPlain(createdUser));
};

export const listAllUsersController = async (req: Request, res: Response) => {
  const allUsers = await listAllUsersService();
  return res.status(200).json(instanceToPlain(allUsers));
};

export const updateUserController = async (req: Request, res: Response) => {
  const data: IUserUpdate = req.body;
  const id: string = req.params.id;
  const updatedUser = await updateUserService(data, id);
  return res.status(200).json(instanceToPlain(updatedUser));
};

export const softDeleteUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const softDeleted = await softDeleteUserService(id);
  return res.status(204).json(softDeleted);
};
