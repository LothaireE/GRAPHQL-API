import express from 'express';
import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { declareHandler } from './middleware/declareHandler';
// import setupRoutes from './routes/routes';

const application = express();

application.use(
    express.urlencoded({ extended: true }),
    express.json(),
    loggingHandler,
    corsHandler,
    declareHandler
    // add an authentication middleware
);

// setupRoutes(application); // setupRoutes(controllers, application, routes);

export default application;
