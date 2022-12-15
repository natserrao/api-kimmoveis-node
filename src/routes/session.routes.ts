import { Router } from "express";
import { sessionLoginController } from "../controllers/session.controller";

const sessionRoutes = Router();

sessionRoutes.post("", sessionLoginController);

export default sessionRoutes;
