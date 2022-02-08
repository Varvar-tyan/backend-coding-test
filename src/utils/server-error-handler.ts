import logger from './logger';
import {SERVER_ERROR} from './consts/error-names';
import {UNKNOWN_ERROR} from './consts/error-messages';
import HttpStatusCodes from './consts/http-statuses-codes';
import {ErrorHandler} from './utils-types';

// express needs a function to have this number of parameters to identify it as an error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const serverErrorHandler: ErrorHandler = (err, req, res, _) => {
  logger.error(err);
  return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
    error_code: SERVER_ERROR,
    message: UNKNOWN_ERROR,
  });
};

export default serverErrorHandler;
