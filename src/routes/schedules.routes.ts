import { Router } from "express";
import {
  createScheduleController,
  listSchedulePropertyController,
} from "../controllers/schedules.controller";
import ensureAdminMiddleware from "../middlewares/ensureAdmin.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const scheduleRoutes = Router();

scheduleRoutes.post("", ensureAuthMiddleware, createScheduleController);
scheduleRoutes.get(
  "/properties/:id",
  ensureAuthMiddleware,
  ensureAdminMiddleware,
  listSchedulePropertyController
);

export default scheduleRoutes;
