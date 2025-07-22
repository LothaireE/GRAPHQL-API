import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

export function MongoQuery(model: Model<any>) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const documents = await model.find({ ...req.body });
            if (documents.length === 0)
                return res.status(404).json({ error: 'No item found' });

            req.mongoQuery = documents;
            req.declaredMethod = 'mongoQuery';
        } catch (error) {
            logging.error('Error in MongoQuery:', error);
            return res.status(500).json(error);
        }
        next();
    };
}
