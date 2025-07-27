import { Express } from 'express';
import healthCheckRoutes from './main.route';
import authRoutes from './auth.route';
import { routeNotFound } from '../middleware/routeNotFound';

// // Single server way
// export default function setupRoutes(application: Express) {
//     application.use('/api', [healthCheckRoutes, authRoutes, bookRoutes]);
//     application.use(routeNotFound);
// }

// Dual server way
export default function setupRoutes(application: Express) {
    application.use('/api', [healthCheckRoutes]);
    application.use(routeNotFound);
}

export function setupAuthRoutes(application: Express) {
    application.use('/api', [authRoutes]);
    application.use(routeNotFound);
}
