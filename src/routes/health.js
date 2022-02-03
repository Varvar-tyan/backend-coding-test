const express = require('express');

// eslint-disable-next-line new-cap
const healthRouter = express.Router();

healthRouter.route('/health')
    .get((req, res) => res.send('Healthy'));

module.exports = healthRouter;
