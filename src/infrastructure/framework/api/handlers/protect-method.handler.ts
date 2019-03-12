export const protectMethodHandler = (req: any, res: any, next: any) => {
  if (!req.isAuthenticated()) {
    return res.sendStatus(401);
  }
  next();
};
