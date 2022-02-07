import * as service from '../services/rides';
import rideSchema from '../validation/rides';
import rideModel from '../models/rides';
import {DEFAULT_OFFSET, DEFAULT_LIMIT} from '../utils/consts/pagination';
import {RIDES_NOT_FOUND_ERROR, VALIDATION_ERROR} from '../utils/consts/error-codes';
import {NO_RIDES_MESSAGE} from '../utils/consts/error-messages';
import HttpStatusCodes from '../utils/consts/http-statuses-codes';
import {ControllerFunction, ValidateError} from '../types/utils-types';

export const findAllRides: ControllerFunction = async (req, res, next) => {
  try {
    const offset = req.query.offset || DEFAULT_OFFSET;
    const limit = req.query.limit || DEFAULT_LIMIT;

    const rides = await service.findAllRides(offset, limit);
    if (!rides.length) {
      return res.status(HttpStatusCodes.NOT_FOUND).send({
        error_code: RIDES_NOT_FOUND_ERROR,
        message: NO_RIDES_MESSAGE,
      });
    }

    res.status(HttpStatusCodes.OK).send(rides);
  } catch (err) {
    next(err);
  }
};

export const findRideByID: ControllerFunction = async (req, res, next) => {
  try {
    const ride = await service.findRideByID(req.params.id);
    if (!ride) {
      return res.status(HttpStatusCodes.NOT_FOUND).send({
        error_code: RIDES_NOT_FOUND_ERROR,
        message: NO_RIDES_MESSAGE,
      });
    }

    res.status(HttpStatusCodes.OK).send(ride);
  } catch (err) {
    next(err);
  }
};

export const createRide: ControllerFunction = async (req, res, next) => {
  try {
    const errors: ValidateError[] = rideSchema.validate(rideModel(req.body));

    if (errors.length) {
      return res.status(HttpStatusCodes.BAD_REQUEST).send({
        error_code: VALIDATION_ERROR,
        message: errors[0].message,
      });
    }

    const result = await service.createRide(req.body);
    const rows = await service.findRideByID(result);

    res.status(HttpStatusCodes.CREATED).send(rows);
  } catch (err) {
    next(err);
  }
};
