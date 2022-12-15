import { Request, Response, NextFunction } from "express";

const ensureIsOwnerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userID = req.params.id;
  if (req.user.isAdm === false) {
    if (userID !== req.user.id) {
      return res.status(401).json({
        message: "You can't update other users",
      });
    }
    return next();
  }
  return next();
};

export default ensureIsOwnerMiddleware;
