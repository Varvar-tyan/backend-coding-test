import express from 'express';
import {findAllRides, findRideByID, createRide} from '../controllers/rides';

export const ridesRouter = express.Router();

export const ridesPath = '/rides';
export const ridePath = '/rides/:id';

ridesRouter.route(ridesPath)
    .get(findAllRides)
    .post(createRide);

ridesRouter.route(ridePath)
    .get(findRideByID);
