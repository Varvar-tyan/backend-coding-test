'use strict';

const express = require('express');
const {findAllRides, findRideByID, createRide} = require('../controllers/rides');

// eslint-disable-next-line new-cap
const ridesRouter = express.Router();

ridesRouter.route('/rides')
    .get(findAllRides)
    .post(createRide);

ridesRouter.route('/rides/:id')
    .get(findRideByID);

module.exports = ridesRouter;
