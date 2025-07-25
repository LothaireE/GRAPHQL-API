import express from 'express';
import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { declareHandler } from './middleware/declareHandler';
import { setupAuthRoutes } from './routes/routes';

const authApplication = express();

authApplication.use(express.urlencoded({ extended: true }));
authApplication.use(express.json());
authApplication.use(loggingHandler);
authApplication.use(corsHandler);
authApplication.use(declareHandler);
setupAuthRoutes(authApplication); // setupRoutes(controllers, authApplication, routes);

export default authApplication;
