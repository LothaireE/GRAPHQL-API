import mongoose from 'mongoose';
import { MongoCreate } from '../../../src/middleware/mongoose/mongoCreate';
import { Request, Response } from 'express';

describe('MongoCreate middleware', () => {
    it('should create and save a document, then call next()', async () => {
        const saveMock = jest.fn().mockResolvedValue(true);
        const modelMock = jest.fn().mockImplementation((data) => ({
            ...data,
            save: saveMock
        }));

        const req = {
            body: { name: 'John Doe' }
        } as Partial<Request> as Request;

        const res = {} as Response;
        const next = jest.fn();

        const middleware = MongoCreate(modelMock as any);
        await middleware(req, res, next);

        expect(modelMock).toHaveBeenCalledWith({
            _id: expect.any(mongoose.Types.ObjectId),
            name: 'John Doe'
        });

        expect(saveMock).toHaveBeenCalled();
        expect(req.mongoCreate).toBeDefined();
        expect(req.declaredMethod).toBe('mongoCreate');
        expect(next).toHaveBeenCalled();
    });

    it('should return 500 if save fails', async () => {
        const errorMock = new Error('Save failed');
        const saveMock = jest.fn().mockRejectedValue(errorMock);
        const modelMock = jest.fn().mockImplementation((data) => ({
            ...data,
            save: saveMock
        }));

        const req = {
            body: { name: 'Jane Doe' }
        } as Partial<Request> as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as Partial<Response> as Response;

        const next = jest.fn();

        const middleware = MongoCreate(modelMock as any);
        await middleware(req, res, next);

        expect(saveMock).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(errorMock);
        expect(next).not.toHaveBeenCalled();
    });
});
