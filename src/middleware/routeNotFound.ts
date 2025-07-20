import { Request, Response, NextFunction } from 'express';

/**
 * This middleware is used to catch all requests that do not match any defined routes.
 */
export function routeNotFound(req: Request, res: Response, next: NextFunction) {
    const error = new Error(
        `Route not found: ${req.method} ${req.originalUrl}`
    );

    logging.error(error);

    return res.status(404).json({
        error: error.message,
        timestamp: new Date().toISOString()
    });
}
