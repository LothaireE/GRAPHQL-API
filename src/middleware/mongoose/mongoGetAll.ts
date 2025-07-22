import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

export function MongoGetAll(model: Model<any>) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const document = await model.find();
            req.mongoGetAll = document; // Attach the document to the request object for later use
            req.declaredMethod = 'mongoGetAll'; // Track the declared method
        } catch (error) {
            logging.error('Error in MongoGetAll:', error);
            return res.status(500).json(error);
        }
        next();
    };
}
