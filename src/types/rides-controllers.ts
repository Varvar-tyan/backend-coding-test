import {ValidationError} from 'validate';
import {Express} from 'express';

export interface ValidateError extends ValidationError {
  message?: string
}

export type ControllerFunction = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) => Promise<void>
