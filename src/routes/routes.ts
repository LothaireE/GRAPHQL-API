import { Express } from 'express';
import healthCheckRoutes from './main.route';
import authRoutes from './auth.route';
import bookRoutes from './book.route';
import { routeNotFound } from '../middleware/routeNotFound';

export default function setupRoutes(application: Express) {
    application.use('/api', [healthCheckRoutes, authRoutes, bookRoutes]);
    application.use(routeNotFound); // Catch-all route for undefined routes, must be last.
}
