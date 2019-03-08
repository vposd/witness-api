import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, _: Response, next: NextFunction) => {
  console.log(`Request ${req.method} ${req.url} -- ${new Date()}`);
  next();
};
