import { Router } from "express";
import {
  createPropertyController,
  listAllPropertiesController,
} from "../controllers/properties.controller";
import ensureAdminMiddleware from "../middlewares/ensureAdmin.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const propertiesRoutes = Router();
propertiesRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureAdminMiddleware,
  createPropertyController
);

propertiesRoutes.get("", listAllPropertiesController);

export default propertiesRoutes;
