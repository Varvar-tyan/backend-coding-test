export {};
const Schema = require('validate');
const {START_COORDINATES_ERROR, END_COORDINATES_ERROR, RIDER_ERROR} = require('../utils/consts/error-messages');

const rideSchema = new Schema({
  start_lat: {
    type: Number,
    required: true,
    size: {
      min: -90,
      max: 90,
    },
    message: START_COORDINATES_ERROR,
  },
  start_long: {
    type: Number,
    required: true,
    size: {
      min: -180,
      max: 180,
    },
    message: START_COORDINATES_ERROR,
  },
  end_lat: {
    type: Number,
    required: true,
    size: {
      min: -90,
      max: 90,
    },
    message: END_COORDINATES_ERROR,
  },
  end_long: {
    type: Number,
    required: true,
    size: {
      min: -180,
      max: 180,
    },
    message: END_COORDINATES_ERROR,
  },
  rider_name: {
    type: String,
    required: true,
    length: {
      min: 1,
    },
    message: RIDER_ERROR,
  },
  driver_name: {
    type: String,
    required: true,
    length: {
      min: 1,
    },
    message: RIDER_ERROR,
  },
  driver_vehicle: {
    type: String,
    required: true,
    length: {
      min: 1,
    },
    message: RIDER_ERROR,
  },
});

module.exports = rideSchema;
