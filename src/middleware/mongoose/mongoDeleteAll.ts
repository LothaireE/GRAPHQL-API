import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

export function MongoDeleteAll(model: Model<any>) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await model.deleteMany({});
            req.declaredMethod = 'mongoDeleteAll';
        } catch (error) {
            logging.error('Error in MongoDeleteAll:', error);
            return res.status(500).json(error);
        }
        next();
    };
}
