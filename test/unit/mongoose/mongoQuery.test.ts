import { Request, Response } from 'express';
import { MongoQuery } from '../../../src/middleware/mongoose/mongoQuery';

describe('MongoQuery middleware', () => {
    it('should query documents and attach them to req.mongoQuery', async () => {
        const mockDocs = [
            { _id: '1', name: 'Item 1' },
            { _id: '2', name: 'Item 2' }
        ];

        const findMock = jest.fn().mockResolvedValue(mockDocs);
        const modelMock = { find: findMock } as any;

        const req = {
            body: { category: 'books' }
        } as Partial<Request> as Request;

        const res = {} as Partial<Response> as Response;
        const next = jest.fn();

        const middleware = MongoQuery(modelMock);
        await middleware(req, res, next);

        expect(findMock).toHaveBeenCalledWith({ category: 'books' });
        expect(req.mongoQuery).toEqual(mockDocs);
        expect(req.declaredMethod).toBe('mongoQuery');
        expect(next).toHaveBeenCalled();
    });

    it('should return 404 if no documents are found', async () => {
        const findMock = jest.fn().mockResolvedValue([]);
        const modelMock = { find: findMock } as any;

        const req = {
            body: { category: 'empty' }
        } as Partial<Request> as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as Partial<Response> as Response;

        const next = jest.fn();

        const middleware = MongoQuery(modelMock);
        await middleware(req, res, next);

        expect(findMock).toHaveBeenCalledWith({ category: 'empty' });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'No item found' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 500 if find throws an error', async () => {
        const error = new Error('Query failed');
        const findMock = jest.fn().mockRejectedValue(error);
        const modelMock = { find: findMock } as any;

        const req = {
            body: { category: 'error' }
        } as Partial<Request> as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as Partial<Response> as Response;

        const next = jest.fn();

        const middleware = MongoQuery(modelMock);
        await middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
        expect(next).not.toHaveBeenCalled();
    });
});
