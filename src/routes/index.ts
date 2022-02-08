import express from 'express';
import {healthRouter} from './health';
import {ridesRouter} from './rides';

const router = express.Router();

router.use(healthRouter);
router.use(ridesRouter);

export default router;
