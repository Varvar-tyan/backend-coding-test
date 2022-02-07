export const RIDES_NOT_FOUND_ERROR = {
  error_code: 'RIDES_NOT_FOUND_ERROR',
  message: 'Could not find any rides',
};
export const START_COORDINATES_ERROR = {
  error_code: 'VALIDATION_ERROR',
  message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
};
export const END_COORDINATES_ERROR = {
  error_code: 'VALIDATION_ERROR',
  message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
};
export const RIDER_ERROR = {
  error_code: 'VALIDATION_ERROR',
  message: 'Rider name must be a non empty string',
};

export const SAMPLE_REQUEST_BODY = {
  'start_lat': 1,
  'start_long': 1,
  'end_lat': 6,
  'end_long': 6,
  'rider_name': 'Rider',
  'driver_name': 'Driver',
  'driver_vehicle': 'Vehicle',
};
export const SAMPLE_RESPONSE = {
  'rideID': 1,
  'startLat': 1,
  'startLong': 1,
  'endLat': 6,
  'endLong': 6,
  'riderName': 'Rider',
  'driverName': 'Driver',
  'driverVehicle': 'Vehicle',
  'created': '2007-04-30 13:10:02',
};
export const FIELDS_TO_CHECK = {
  'startLat': 1,
  'startLong': 1,
  'endLat': 6,
  'endLong': 6,
  'riderName': 'Rider',
  'driverName': 'Driver',
  'driverVehicle': 'Vehicle',
};
export const SAMPLE_INJECTION = {
  'start_lat': 1,
  'start_long': 1,
  'end_lat': 6,
  'end_long': 6,
  'rider_name': ';DROP TABLE Rides;',
  'driver_name': ';DROP TABLE Rides;',
  'driver_vehicle': ';DROP TABLE Rides;',
};
