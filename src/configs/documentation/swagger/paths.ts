import HttpStatusCodes from '../../../utils/consts/http-statuses-codes';

const serverErrorResponse = {
  [HttpStatusCodes.INTERNAL_SERVER_ERROR]: {
    description: 'Internal Server Error',
    content: {
      'application/json': {
        schema: {
          items: {
            $ref: '#/components/schemas/ServerError',
          },
        },
      },
    },
  },
};

const notFoundResponse = {
  [HttpStatusCodes.NOT_FOUND]: {
    description: 'Not Found Error',
    content: {
      'application/json': {
        schema: {
          items: {
            $ref: '#/components/schemas/NotFoundError',
          },
        },
      },
    },
  },
};

const paths = {
  '/health': {
    get: {
      tags: ['Health'],
      summary: 'Test server health',
      description: `Check whether the server is running.`,
      operationId: 'health-check',
      responses: {
        [HttpStatusCodes.OK]: {
          description: 'Healthy',
        },
        ...serverErrorResponse,
      },
    },
  },

  '/rides': {
    get: {
      tags: ['Rides'],
      summary: 'Get Rides entities',
      description: `Retrieve all the existing Rides entities.`,
      operationId: 'rides-get',
      parameters: [
        {
          in: 'query',
          name: 'offset',
          schema: {
            type: 'integer',
          },
          description: 'the number of records to skip; the server defaults to 0',
        },
        {
          in: 'query',
          name: 'limit',
          schema: {
            type: 'integer',
          },
          description: 'the number of records to retrieve; the server defaults to 50',
        },
      ],
      responses: {
        [HttpStatusCodes.OK]: {
          description: 'Array of Ride entities.',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/RidesResponse',
                },
              },
            },
          },
        },
        ...notFoundResponse,
        ...serverErrorResponse,
      },
    },
    post: {
      tags: ['Rides'],
      summary: 'Create a Rides entity',
      description: `Create a new Rides entity and retrieve it.`,
      operationId: 'rides-post',
      requestBody: {
        description: ``,
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/RidesRequest',
            },
          },
        },
      },
      responses: {
        [HttpStatusCodes.CREATED]: {
          description: 'Array with a new Rides entity.',
          content: {
            'application/json': {
              schema: {
                items: {
                  $ref: '#/components/schemas/RidesResponse',
                },
              },
            },
          },
        },
        [HttpStatusCodes.BAD_REQUEST]: {
          description: 'Validation Error',
          content: {
            'application/json': {
              schema: {
                items: {
                  $ref: '#/components/schemas/ValidationError',
                },
              },
            },
          },
        },
        ...serverErrorResponse,
      },
    },
  },

  '/rides/{id}': {
    get: {
      tags: ['Rides'],
      summary: 'Retrieve a Ride entity',
      description: `Retrieve one of the Ride entities with a specified id.`,
      operationId: 'ride-get',
      parameters: [
        {
          id: 'id',
          in: 'path',
          name: 'id',
          description: 'ID of a Ride entity',
          required: true,
        },
      ],
      responses: {
        [HttpStatusCodes.OK]: {
          description: 'A Ride entity with a specified id.',
          content: {
            'application/json': {
              schema: {
                items: {
                  $ref: '#/components/schemas/RidesResponse',
                },
              },
            },
          },
        },
        ...notFoundResponse,
        ...serverErrorResponse,
      },
    },
  },
};

export default paths;
