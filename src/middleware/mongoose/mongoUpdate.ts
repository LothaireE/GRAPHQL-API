import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

export function MongoUpdate(model: Model<any>) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const document = await model.findById(req.params.id);
            if (!document)
                return res.status(404).json({ error: 'Document not found' });

            document.set(req.body);
            await document.save();
            req.mongoUpdate = document;
            req.declaredMethod = 'mongoUpdate';
        } catch (error) {
            logging.error('Error in MongoUpdate:', error);
            return res.status(500).json(error);
        }
        next();
    };
}
