import { Request, Response, NextFunction } from 'express';

class BookController {
    static getAll(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({
            message: 'Items retrieved successfully',
            data: req.mongoGetAll,
            timestamp: new Date().toISOString()
        });
    }
    static get(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({
            message: 'Item retrieved successfully',
            data: req.mongoGet,
            timestamp: new Date().toISOString()
        });
    }
    static create(req: Request, res: Response) {
        return res.status(201).json({
            message: 'Item created successfully',
            data: req.mongoCreate,
            timestamp: new Date().toISOString()
        });
    }
    static update(req: Request, res: Response) {
        return res.status(200).json({
            message: 'Item updated successfully',
            data: req.mongoUpdate,
            timestamp: new Date().toISOString()
        });
    }
    static query(req: Request, res: Response) {
        return res.status(200).json({
            message: 'Query executed successfully',
            data: req.mongoQuery,
            timestamp: new Date().toISOString()
        });
    }
    static delete(req: Request, res: Response) {
        return res.status(200).json({
            message: 'Item deleted successfully',
            timestamp: new Date().toISOString()
        });
    }
}

export default BookController;
