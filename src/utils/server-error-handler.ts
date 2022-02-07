import logger from './logger';
import {SERVER_ERROR} from './consts/error-codes';
import {UNKNOWN_ERROR} from './consts/error-messages';

const serverErrorHandler = (err, req, res, next) => {
  logger.error(err);
  return res.send({
    error_code: SERVER_ERROR,
    message: UNKNOWN_ERROR,
  });
};

export default serverErrorHandler;
