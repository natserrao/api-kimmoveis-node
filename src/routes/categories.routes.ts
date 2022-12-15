import { Router } from "express";
import {
  createCategorieController,
  getPropertiesByCategoryController,
  listAllCategoriesController,
} from "../controllers/categories.controller";
import ensureAdminMiddleware from "../middlewares/ensureAdmin.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const categoriesRoutes = Router();

categoriesRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureAdminMiddleware,
  createCategorieController
);

categoriesRoutes.get("", listAllCategoriesController);
categoriesRoutes.get("/:id/properties", getPropertiesByCategoryController);

export default categoriesRoutes;
