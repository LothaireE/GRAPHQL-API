import { Router } from 'express';
import HealthCheck from '../controller/main.controller';

const mainRouter = Router();
// GET
mainRouter.get('/main/healthcheck', HealthCheck.healthCheck);
mainRouter.get('/main/healthcheck/details', HealthCheck.healthCheckWithDetails);

export default mainRouter;
