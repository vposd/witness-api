import { Response } from 'express';

export class BaseController {

  static sendMessage(res: Response, code: number, message: string) {
    return res.status(code).json({ message });
  }

  ok<T>(res: Response, data?: T) {
    return res
      .status(200)
      .json(data);
  }

  created(res: Response) {
    return res
      .status(201)
      .send();
  }

  clientError(res: Response, message?: string) {
    BaseController.sendMessage(res, 400, message || 'Argument Exception');
  }

  forbidden(res: Response, message?: string) {
    BaseController.sendMessage(res, 403, message || 'Forbidden');
  }

  notFound(res: Response, message?: string) {
    BaseController.sendMessage(res, 404, message || 'Not Found');
  }

  fail(res: Response, error: Error | string) {
    BaseController.sendMessage(res, 500, error.toString());
  }

}