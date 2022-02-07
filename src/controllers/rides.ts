import {Express} from 'express';
import * as service from '../services/rides';
import rideSchema from '../validation/rides';
import rideModel from '../models/rides';
import {DEFAULT_OFFSET, DEFAULT_LIMIT} from '../utils/consts/pagination';
import {RIDES_NOT_FOUND_ERROR, VALIDATION_ERROR} from '../utils/consts/error-codes';
import {NO_RIDES_MESSAGE} from '../utils/consts/error-messages';
import {ValidationError} from 'validate';
import {BAD_REQUEST, NOT_FOUND} from '../utils/consts/error-statuses';

interface Error extends ValidationError {
  message?: string
}

type ControllerFunction = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) => Promise<void>

export const findAllRides: ControllerFunction = async (req, res, next) => {
  try {
    const offset = req.query.offset || DEFAULT_OFFSET;
    const limit = req.query.limit || DEFAULT_LIMIT;

    const rows = await service.findAllRides(offset, limit);
    if (rows.length === 0) {
      return res.status(NOT_FOUND).send({
        error_code: RIDES_NOT_FOUND_ERROR,
        message: NO_RIDES_MESSAGE,
      });
    }

    res.send(rows);
  } catch (err) {
    next(err);
  }
};

export const findRideByID: ControllerFunction = async (req, res, next) => {
  try {
    const rows = await service.findRideByID(req.params.id);
    if (rows.length === 0) {
      return res.status(NOT_FOUND).send({
        error_code: RIDES_NOT_FOUND_ERROR,
        message: NO_RIDES_MESSAGE,
      });
    }

    res.send(rows);
  } catch (err) {
    next(err);
  }
};

export const createRide: ControllerFunction = async (req, res, next) => {
  try {
    const errors: Error[] = rideSchema.validate(rideModel(req.body));

    if (errors.length) {
      return res.status(BAD_REQUEST).send({
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
