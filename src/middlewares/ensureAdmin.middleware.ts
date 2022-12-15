import { Request, Response, NextFunction } from "express";

const ensureAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.isAdm === false) {
    return res.status(403).json({
      message: "Missing admin authorizations",
    });
  }
  return next();
};

export default ensureAdminMiddleware;
