import Schema from 'validate';
import {START_COORDINATES_ERROR, END_COORDINATES_ERROR, RIDER_ERROR} from '../utils/consts/error-messages';

const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;
const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;

const rideSchema = new Schema({
  start_lat: {
    type: Number,
    required: true,
    size: {
      min: MIN_LATITUDE,
      max: MAX_LATITUDE,
    },
    message: START_COORDINATES_ERROR,
  },
  start_long: {
    type: Number,
    required: true,
    size: {
      min: MIN_LONGITUDE,
      max: MAX_LONGITUDE,
    },
    message: START_COORDINATES_ERROR,
  },
  end_lat: {
    type: Number,
    required: true,
    size: {
      min: MIN_LATITUDE,
      max: MAX_LATITUDE,
    },
    message: END_COORDINATES_ERROR,
  },
  end_long: {
    type: Number,
    required: true,
    size: {
      min: MIN_LONGITUDE,
      max: MAX_LONGITUDE,
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

export default rideSchema;
