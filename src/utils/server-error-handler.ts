import logger from './logger';
import {SERVER_ERROR} from './consts/error-codes';
import {UNKNOWN_ERROR} from './consts/error-messages';
import {ErrorHandler} from '../types/utils-types';
import HttpStatusCodes from './consts/http-statuses-codes';

// express needs a function to have this amount of parameters to identify it as an error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const serverErrorHandler: ErrorHandler = (err, req, res, next) => {
  logger.error(err);
  return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
    error_code: SERVER_ERROR,
    message: UNKNOWN_ERROR,
  });
};

export default serverErrorHandler;
