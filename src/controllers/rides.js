const logger = require('../utils/logger');
const service = require('../services/rides');

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
    const startLatitude = Number(req.body.start_lat);
    const startLongitude = Number(req.body.start_long);
    const endLatitude = Number(req.body.end_lat);
    const endLongitude = Number(req.body.end_long);
    const riderName = req.body.rider_name;
    const driverName = req.body.driver_name;
    const driverVehicle = req.body.driver_vehicle;

    if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
      });
    }

    if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
      });
    }

    if (typeof riderName !== 'string' || riderName.length < 1) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
      });
    }

    if (typeof driverName !== 'string' || driverName.length < 1) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
      });
    }

    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
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
