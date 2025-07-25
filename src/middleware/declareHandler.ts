import { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';
import { AuthorizedUser } from '../types/user';

declare global {
    namespace Express {
        interface Request {
            mongoGet: Document | undefined; // Attach the type for the documents retrieved from MongoDB
            mongoGetAll: Document[];
            mongoCreate: Document | undefined;
            mongoUpdate: Document | undefined;
            mongoQuery: Document[];
            declaredMethod?: string;
            authorizedUser: AuthorizedUser | undefined;
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
    req.declaredMethod = undefined;
    req.authorizedUser = undefined;

    next();
}
