'use strict';

const service = require('../services/rides');
const rideSchema = require('../validation/rides');
const rideModel = require('../models/rides');
const {DEFAULT_OFFSET, DEFAULT_LIMIT} = require('../utils/consts/pagination');
const {RIDES_NOT_FOUND_ERROR, VALIDATION_ERROR} = require('../utils/consts/error-codes');
const {NO_RIDES_MESSAGE} = require('../utils/consts/error-messages');


const findAllRides = async (req, res, next) => {
  try {
    const offset = req.query.offset || DEFAULT_OFFSET;
    const limit = req.query.limit || DEFAULT_LIMIT;

    const rows = await service.findAllRides(offset, limit);
    if (rows.length === 0) {
      return res.send({
        error_code: RIDES_NOT_FOUND_ERROR,
        message: NO_RIDES_MESSAGE,
      });
    }

    res.send(rows);
  } catch (err) {
    next(err);
  }
};

const findRideByID = async (req, res, next) => {
  try {
    const rows = await service.findRideByID(req.params.id);
    if (rows.length === 0) {
      return res.send({
        error_code: RIDES_NOT_FOUND_ERROR,
        message: NO_RIDES_MESSAGE,
      });
    }

    res.send(rows);
  } catch (err) {
    next(err);
  }
};

const createRide = async (req, res, next) => {
  try {
    const errors = rideSchema.validate(rideModel(req.body));

    if (errors.length) {
      return res.send({
        error_code: VALIDATION_ERROR,
        message: errors[0].message,
      });
    }

    const values = Object.values(rideModel(req.body));

    const result = await service.createRide(values);
    const rows = await service.findRideByID(result.lastID);

    res.send(rows);
  } catch (err) {
    next(err);
  }
};

module.exports = {findAllRides, findRideByID, createRide};
