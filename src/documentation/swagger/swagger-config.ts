export {};
const paths = require('./paths');
const components = require('./schemas');
const HOST = process.env.HOST;
const PORT = process.env.PORT;

const config = {
  openapi: '3.0.1',
  info: {
    title: 'Rides-REST',
    version: '1.0.0',
    description: `The application goal is creating and retrieving Rides entities from the database.`,
  },
  servers: [
    {
      url: `http://${HOST}:${PORT}`,
    },
  ],
  tags: [
    {
      name: 'Health',
    },
    {
      name: 'Rides',
    },
  ],
  paths,
  components,
};

module.exports = config;
