'use strict';

const logger = require('../utils/logger');
const service = require('../services/rides');
const rideSchema = require('../validation/rides');
const rideModel = require('../models/rides');

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 50;

const findAllRides = async (req, res) => {
  try {
    const offset = req.query.offset || DEFAULT_OFFSET;
    const limit = req.query.limit || DEFAULT_LIMIT;

    const rows = await service.findAllRides(offset, limit);
    if (rows.length === 0) {
      return res.send({
        error_code: 'RIDES_NOT_FOUND_ERROR',
        message: 'Could not find any rides',
      });
    }

    res.send(rows);
  } catch (err) {
    logger.error(err);
    return res.send({
      error_code: 'SERVER_ERROR',
      message: 'Unknown error',
    });
  }
};

const findRideByID = async (req, res) => {
  try {
    const rows = await service.findRideByID(req.params.id);
    if (rows.length === 0) {
      return res.send({
        error_code: 'RIDES_NOT_FOUND_ERROR',
        message: 'Could not find any rides',
      });
    }

    res.send(rows);
  } catch (err) {
    logger.error(err);
    return res.send({
      error_code: 'SERVER_ERROR',
      message: 'Unknown error',
    });
  }
};

const createRide = async (req, res) => {
  try {
    const errors = rideSchema.validate(rideModel(req.body));

    if (errors.length) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: errors[0].message,
      });
    }

    const values = Object.values(rideModel(req.body));

    const result = await service.createRide(values);
    const rows = await service.findRideByID(result.lastID);

    res.send(rows);
  } catch (err) {
    logger.error(err);
    return res.send({
      error_code: 'SERVER_ERROR',
      message: 'Unknown error',
    });
  }
};

module.exports = {findAllRides, findRideByID, createRide};
