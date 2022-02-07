import express from 'express';

// eslint-disable-next-line new-cap
const healthRouter = express.Router();

healthRouter.route('/health')
    .get((req, res) => res.send('Healthy'));

export default healthRouter;
