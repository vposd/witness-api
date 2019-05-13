import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, _, res, next) => {
  res
    .status(error.status || 500)
    .json({error: error.message, stack: JSON.stringify(error.stack) });
};
