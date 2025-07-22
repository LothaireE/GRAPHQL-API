import { Request, Response, NextFunction } from 'express';
import mongoose, { Model } from 'mongoose';
import { TEST } from '../../config/config';

export function MongoCreate(model: Model<any>) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const document = new model({
                _id: new mongoose.Types.ObjectId(),
                ...req.body
            });
            await document.save();
            req.mongoCreate = document;
            req.declaredMethod = 'mongoCreate';
        } catch (error) {
            !TEST && logging.error('Error in MongoCreate:', error);
            return res.status(500).json(error);
        }
        next();
    };
}
