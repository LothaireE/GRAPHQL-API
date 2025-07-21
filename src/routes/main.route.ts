import { Router } from 'express';
import { healthCheck } from '../controller/main.controller';

const mainRouter = Router();
// GET
mainRouter.get('/main/healthcheck', healthCheck);

export default mainRouter;
