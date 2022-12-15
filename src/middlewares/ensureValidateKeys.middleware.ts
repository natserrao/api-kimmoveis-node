import { Request, Response, NextFunction } from "express";

const ensureValidateKeysMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const keys = Object.keys(req.body);
  if (
    keys.includes("id") ||
    keys.includes("isAdm") ||
    keys.includes("isActive")
  ) {
    return res.status(401).json({
      message: "You can't update these fields: id, isAdm and isActive",
    });
  }
  return next();
};

export default ensureValidateKeysMiddleware;
