import { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';

declare global {
    namespace Express {
        interface Request {
            mongoGet: Document | undefined; // Attach the type for the documents retrieved from MongoDB
            mongoGetAll: Document[];
            mongoCreate: Document | undefined;
            mongoUpdate: Document | undefined;
            mongoQuery: Document[];
            declaredMethod?: string; // Optional property to track the declared method
        }
    }
}

export function declareHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // This middleware is used to declare the types for the request object
    // It does not perform any operations but ensures that the types are available throughout the application

    req.mongoGet = undefined;
    req.mongoGetAll = [];
    req.mongoCreate = undefined;
    req.mongoUpdate = undefined;
    req.mongoQuery = [];
    req.declaredMethod = undefined; // Assuming you want to keep track of the declared method

    next();
}
