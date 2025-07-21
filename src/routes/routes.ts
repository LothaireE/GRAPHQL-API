// import { Express, RequestHandler } from 'express';
import { Express } from 'express';
import healthCheckRoutes from './main.route';
import authRoutes from './auth.route';
import { routeNotFound } from '../middleware/routeNotFound';

// type RouteHandler = Map<keyof Express, Map<string, RequestHandler[]>>;

export default function setupRoutes(
    // controllers: any,
    application: Express
    // routes: RouteHandler
) {
    application.use('/api', [healthCheckRoutes, authRoutes]);
    application.use(routeNotFound);
}
