'use strict';

export {};
const express = require('express');
const bodyParser = require('body-parser');
const healthRouter = require('./routes/health');
const ridesRouter = require('./routes/rides');
const serverErrorHandler = require('./utils/server-error-handler');
const swaggerUI = require('swagger-ui-express');
const swaggerConfig = require('./documentation/swagger/swagger-config');

const jsonParser = bodyParser.json();

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig));
app.use(jsonParser);
app.use(healthRouter);
app.use(ridesRouter);
app.use(serverErrorHandler);

module.exports = app;
