const Schema = require('validate');

const rideSchema = new Schema({
  start_lat: {
    type: Number,
    required: true,
    size: {
      min: -90,
      max: 90,
    },
    message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
  },
  start_long: {
    type: Number,
    required: true,
    size: {
      min: -180,
      max: 180,
    },
    message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
  },
  end_lat: {
    type: Number,
    required: true,
    size: {
      min: -90,
      max: 90,
    },
    message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
  },
  end_long: {
    type: Number,
    required: true,
    size: {
      min: -180,
      max: 180,
    },
    message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
  },
  rider_name: {
    type: String,
    required: true,
    length: {
      min: 1,
    },
    message: 'Rider name must be a non empty string',
  },
  driver_name: {
    type: String,
    required: true,
    length: {
      min: 1,
    },
    message: 'Rider name must be a non empty string',
  },
  driver_vehicle: {
    type: String,
    required: true,
    length: {
      min: 1,
    },
    message: 'Rider name must be a non empty string',
  },
});

module.exports = rideSchema;
