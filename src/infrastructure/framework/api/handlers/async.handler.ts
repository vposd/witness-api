import { Middleware } from '../../types';

type AsyncHandler = (fn: Middleware) => Middleware;

export const asyncHandler: AsyncHandler = fn =>
  (req, res, next) =>
    Promise
      .resolve(fn(req, res, next))
      .catch(next);
