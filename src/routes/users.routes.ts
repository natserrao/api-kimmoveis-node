import { Router } from "express";
import {
  createUserController,
  listAllUsersController,
  softDeleteUserController,
  updateUserController,
} from "../controllers/users.controller";
import ensureAdminMiddleware from "../middlewares/ensureAdmin.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsOwnerMiddleware from "../middlewares/ensureIsOwner.middleware";
import ensureValidateKeysMiddleware from "../middlewares/ensureValidateKeys.middleware";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureAdminMiddleware,
  listAllUsersController
);
userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIsOwnerMiddleware,
  ensureValidateKeysMiddleware,
  updateUserController
);

userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureAdminMiddleware,
  softDeleteUserController
);

export default userRoutes;
