const paths = {
  '/health': {
    get: {
      tags: ['Health'],
      summary: 'Test server health',
      description: `Check whether the server is running.`,
      operationId: 'health-check',
      responses: {
        200: {
          description: 'Healthy',
        },
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
        200: {
          description: 'Array of Rides entities.',
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
        200: {
          description: 'Array with a new Rides entity.',
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
      },
    },
  },

  '/rides/{id}': {
    get: {
      tags: ['Rides'],
      summary: 'Retrieve a Rides entity',
      description: `Retrieve one of the Rides entities with a specified id.`,
      operationId: 'ride-get',
      parameters: [
        {
          id: 'id',
          in: 'path',
          name: 'id',
          description: 'ID of a Rides entity',
          required: true,
        },
      ],
      responses: {
        200: {
          description: 'Array with a Rides entity with a specified id.',
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
      },
    },
  },
};

export default paths;
