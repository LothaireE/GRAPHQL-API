import { Request, Response } from 'express';
import { MongoUpdate } from '../../../src/middleware/mongoose/mongoUpdate';

describe('MongoUpdate middleware', () => {
    it('should update a document and call next()', async () => {
        const mockDoc = {
            _id: '123',
            name: 'Old Name',
            set: jest.fn(),
            save: jest.fn().mockResolvedValue(true)
        };

        const findByIdMock = jest.fn().mockResolvedValue(mockDoc);
        const modelMock = {
            findById: findByIdMock
        } as any;

        const req = {
            params: { id: '123' },
            body: { name: 'New Name' }
        } as Partial<Request> as Request;

        const res = {} as Partial<Response> as Response;
        const next = jest.fn();

        const middleware = MongoUpdate(modelMock);
        await middleware(req, res, next);

        expect(findByIdMock).toHaveBeenCalledWith('123');
        expect(mockDoc.set).toHaveBeenCalledWith({ name: 'New Name' });
        expect(mockDoc.save).toHaveBeenCalled();
        expect(req.mongoUpdate).toBe(mockDoc);
        expect(req.declaredMethod).toBe('mongoUpdate');
        expect(next).toHaveBeenCalled();
    });

    it('should return 404 if document is not found', async () => {
        const findByIdMock = jest.fn().mockResolvedValue(null);
        const modelMock = { findById: findByIdMock } as any;

        const req = {
            params: { id: 'notfound' },
            body: {}
        } as Partial<Request> as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as Partial<Response> as Response;

        const next = jest.fn();

        const middleware = MongoUpdate(modelMock);
        await middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Document not found' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 500 if update throws an error', async () => {
        const error = new Error('Update failed');
        const findByIdMock = jest.fn().mockRejectedValue(error);

        const modelMock = { findById: findByIdMock } as any;

        const req = {
            params: { id: '123' },
            body: { name: 'Test' }
        } as Partial<Request> as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as Partial<Response> as Response;

        const next = jest.fn();

        const middleware = MongoUpdate(modelMock);
        await middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
        expect(next).not.toHaveBeenCalled();
    });
});
