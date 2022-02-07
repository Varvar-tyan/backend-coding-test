import express from 'express';

export const healthRouter = express.Router();

export const healthPath = '/health';

healthRouter.route(healthPath)
    .get((req, res) => res.send('Healthy'));

