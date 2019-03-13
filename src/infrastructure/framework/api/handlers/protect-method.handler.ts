import { Middleware } from '../../types';

export const protectMethodHandler: Middleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res
      .status(401)
      .send();
    return;
  }
  next();
};
