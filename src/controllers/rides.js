const logger = require('../utils/logger');
const service = require('../services/rides');
const rideSchema = require('../validation/rides');

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
    const errors = rideSchema.validate({
      start_lat: Number(req.body.start_lat),
      start_long: Number(req.body.start_long),
      end_lat: Number(req.body.end_lat),
      end_long: Number(req.body.end_long),
      rider_name: req.body.rider_name,
      driver_name: req.body.driver_name,
      driver_vehicle: req.body.driver_vehicle,
    });

    if (errors.length) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: errors[0].message,
      });
    }

    const values = [
      req.body.start_lat,
      req.body.start_long,
      req.body.end_lat,
      req.body.end_long,
      req.body.rider_name,
      req.body.driver_name,
      req.body.driver_vehicle,
    ];

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
