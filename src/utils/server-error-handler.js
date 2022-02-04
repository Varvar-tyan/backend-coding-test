'use strict';

const logger = require('./logger');
const {SERVER_ERROR} = require('./consts/error-codes');
const {UNKNOWN_ERROR} = require('./consts/error-messages');

const serverErrorHandler = (err, req, res, next) => {
  logger.error(err);
  return res.send({
    error_code: SERVER_ERROR,
    message: UNKNOWN_ERROR,
  });
};

module.exports = serverErrorHandler;
