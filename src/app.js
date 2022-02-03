'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const healthRouter = require('./routes/health');
const ridesRouter = require('./routes/rides');

const jsonParser = bodyParser.json();

const app = express();

app.use(jsonParser);
app.use(healthRouter);
app.use(ridesRouter);

module.exports = app;
