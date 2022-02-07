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
  },
};

export default components;
