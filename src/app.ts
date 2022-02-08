import express from 'express';
import bodyParser from 'body-parser';
import serverErrorHandler from './utils/server-error-handler';
import swaggerUI from 'swagger-ui-express';
import swaggerConfig from './configs/documentation/swagger/swagger-config';
import router from './routes';

const docsPath = '/api-docs';
const jsonParser = bodyParser.json();

const app = express();

app.use(docsPath, swaggerUI.serve, swaggerUI.setup(swaggerConfig));
app.use(jsonParser);
app.use(router);
app.use(serverErrorHandler);

export default app;
