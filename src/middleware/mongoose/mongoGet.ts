import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { TEST } from '../../config/config';

export function MongoGet(model: Model<any>) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const document = await model.findById(req.params.id);
            if (!document)
                return res.status(404).json({ error: 'Document not found' });

            req.mongoGet = document;
            req.declaredMethod = 'mongoGet';
        } catch (error) {
            !TEST && logging.error('Error in MongoGet:', error);
            return res.status(500).json(error);
        }
        next();
    };
}
