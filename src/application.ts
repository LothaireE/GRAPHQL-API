import express from 'express';
import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { declareHandler } from './middleware/declareHandler';
import setupRoutes from './routes/routes';

const application = express();

application.use(express.urlencoded({ extended: true }));
application.use(express.json());
application.use(loggingHandler);
application.use(corsHandler);
application.use(declareHandler); // middleware used to declare handlers for specific routes or functionalities(e.g., MongoDB operations in this case)
setupRoutes(application); // setupRoutes(controllers, application, routes);

export default application;
