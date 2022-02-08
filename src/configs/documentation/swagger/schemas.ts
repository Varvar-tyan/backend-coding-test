import {SERVER_ERROR, RIDES_NOT_FOUND_ERROR, VALIDATION_ERROR} from '../../../utils/consts/error-names';
import {NO_RIDES_MESSAGE, START_COORDINATES_ERROR, UNKNOWN_ERROR} from '../../../utils/consts/error-messages';

const components = {
  schemas: {
    RidesRequest: {
      type: 'object',
      description: 'Sample request body.',
      properties: {
        start_lat: {
          type: 'number',
          minimum: -90,
          maximum: 90,
          required: true,
          description: 'Start latitude',
        },
        start_long: {
          type: 'number',
          minimum: -180,
          maximum: 180,
          required: true,
          description: 'Start longitude',
        },
        end_lat: {
          type: 'number',
          minimum: -90,
          maximum: 90,
          required: true,
          description: 'End latitude',
        },
        end_long: {
          type: 'number',
          minimum: -180,
          maximum: 180,
          required: true,
          description: 'End longitude',
        },
        rider_name: {
          type: 'string',
          minLength: 1,
          required: true,
          description: 'Rider\'s name',
        },
        driver_name: {
          type: 'string',
          minLength: 1,
          required: true,
          description: 'Driver\'s name',
        },
        driver_vehicle: {
          type: 'string',
          minLength: 1,
          required: true,
          description: 'Driver\'s vehicle',
        },
      },
    },
    RidesResponse: {
      type: 'object',
      description: 'Sample response body.',
      properties: {
        rideID: {
          type: 'number',
          description: 'A new Rides entity ID',
          required: true,
          example: 1,
        },
        startLat: {
          type: 'number',
          minimum: -90,
          maximum: 90,
          required: true,
          description: 'Start latitude',
        },
        startLong: {
          type: 'number',
          minimum: -180,
          maximum: 180,
          required: true,
          description: 'Start longitude',
        },
        endLat: {
          type: 'number',
          minimum: -90,
          maximum: 90,
          required: true,
          description: 'End latitude',
        },
        endLong: {
          type: 'number',
          minimum: -180,
          maximum: 180,
          required: true,
          description: 'End longitude',
        },
        riderName: {
          type: 'string',
          minLength: 1,
          required: true,
          description: 'Rider\'s name',
        },
        driverName: {
          type: 'string',
          minLength: 1,
          required: true,
          description: 'Driver\'s name',
        },
        driverVehicle: {
          type: 'string',
          minLength: 1,
          required: true,
          description: 'Driver\'s vehicle',
        },
        created: {
          type: 'string',
          required: true,
          example: '2007-04-30 13:10:02',
          description: 'The time of the entity creation',
        },
      },
    },
    ServerError: {
      type: 'object',
      description: 'A server error response',
      properties: {
        error_code: {
          type: 'string',
          required: true,
          example: SERVER_ERROR,
          description: 'The error name',
        },
        message: {
          type: 'string',
          required: true,
          example: UNKNOWN_ERROR,
          description: 'Server error message',
        },
      },
    },
    ValidationError: {
      type: 'object',
      description: 'A validation error response',
      properties: {
        error_code: {
          type: 'string',
          required: true,
          example: VALIDATION_ERROR,
          description: 'The error name',
        },
        message: {
          type: 'string',
          required: true,
          example: START_COORDINATES_ERROR,
          description: 'Validation error message',
        },
      },
    },
    NotFoundError: {
      type: 'object',
      description: 'A not found error response',
      properties: {
        error_code: {
          type: 'string',
          required: true,
          example: RIDES_NOT_FOUND_ERROR,
          description: 'The error name',
        },
        message: {
          type: 'string',
          required: true,
          example: NO_RIDES_MESSAGE,
          description: 'No rides error message',
        },
      },
    },
  },
};

export default components;
