import express from 'express';
import bodyParser from 'body-parser';
import healthRouter from './routes/health';
import ridesRouter from './routes/rides';
import serverErrorHandler from './utils/server-error-handler';
import swaggerUI from 'swagger-ui-express';
import swaggerConfig from './documentation/swagger/swagger-config';

const jsonParser = bodyParser.json();

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig));
app.use(jsonParser);
app.use(healthRouter);
app.use(ridesRouter);
app.use(serverErrorHandler);

export default app;