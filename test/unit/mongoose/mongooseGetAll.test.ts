import { Request, Response } from 'express';
import { MongoGetAll } from '../../../src/middleware/mongoose/mongoGetAll';

describe('MongoGetAll middleware', () => {
    it('should retrieve documents and attach them to req.mongoGetAll', async () => {
        const mockDocs = [
            { _id: '1', name: 'Doc 1' },
            { _id: '2', name: 'Doc 2' }
        ];
        const findMock = jest.fn().mockResolvedValue(mockDocs);

        const modelMock = { find: findMock } as any;

        const req = {} as Partial<Request> as Request;
        const res = {} as Partial<Response> as Response;
        const next = jest.fn();

        const middleware = MongoGetAll(modelMock);
        await middleware(req, res, next);

        expect(findMock).toHaveBeenCalled();
        expect(req.mongoGetAll).toEqual(mockDocs);
        expect(req.declaredMethod).toBe('mongoGetAll');
        expect(next).toHaveBeenCalled();
    });

    it('should return 500 if find() fails', async () => {
        const error = new Error('Find failed');
        const findMock = jest.fn().mockRejectedValue(error);

        const modelMock = { find: findMock } as any;

        const req = {} as Partial<Request> as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as Partial<Response> as Response;

        const next = jest.fn();

        const middleware = MongoGetAll(modelMock);
        await middleware(req, res, next);

        expect(findMock).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
        expect(next).not.toHaveBeenCalled();
    });
});
