'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const healthRouter = require('./routes/health');
const ridesRouter = require('./routes/rides');
const serverErrorHandler = require('./utils/server-error-handler');

const jsonParser = bodyParser.json();

const app = express();

app.use(jsonParser);
app.use(healthRouter);
app.use(ridesRouter);
app.use(serverErrorHandler);

module.exports = app;
