import { MongoDelete } from '../../../src/middleware/mongoose/mongoDelete';
import { Request, Response } from 'express';

describe('MongoDelete middleware', () => {
    it('should delete a document and call next()', async () => {
        const mockDoc = { _id: '123', name: 'To delete' };
        const findOneAndDeleteMock = jest.fn().mockResolvedValue(mockDoc);

        const modelMock = {
            findOneAndDelete: findOneAndDeleteMock
        } as any;

        const req = {
            params: { id: '123' }
        } as Partial<Request> as Request;

        const res = {} as Partial<Response> as Response;
        const next = jest.fn();

        const middleware = MongoDelete(modelMock);
        await middleware(req, res, next);

        expect(findOneAndDeleteMock).toHaveBeenCalledWith({ _id: '123' });
        expect(req.declaredMethod).toBe('mongoDelete');
        expect(next).toHaveBeenCalled();
    });

    it('should return 404 if document is not found', async () => {
        const findOneAndDeleteMock = jest.fn().mockResolvedValue(null);

        const modelMock = {
            findOneAndDelete: findOneAndDeleteMock
        } as any;

        const req = {
            params: { id: 'not-found' }
        } as Partial<Request> as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as Partial<Response> as Response;

        const next = jest.fn();

        const middleware = MongoDelete(modelMock);
        await middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Document not found' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 500 if deletion throws an error', async () => {
        const error = new Error('Delete failed');
        const findOneAndDeleteMock = jest.fn().mockRejectedValue(error);

        const modelMock = {
            findOneAndDelete: findOneAndDeleteMock
        } as any;

        const req = {
            params: { id: '123' }
        } as Partial<Request> as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as Partial<Response> as Response;

        const next = jest.fn();

        const middleware = MongoDelete(modelMock);
        await middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
        expect(next).not.toHaveBeenCalled();
    });
});
