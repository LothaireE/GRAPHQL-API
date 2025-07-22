import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { MongoGet } from '../../../src/middleware/mongoose/mongoGet';
import { MongoGetAll } from '../../../src/middleware/mongoose/mongoGetAll';

describe('MongoGet middleware', () => {
    it('should find a document and attach it to req.mongoGet', async () => {
        const mockDoc = { _id: '123', name: 'Test' };
        const findByIdMock = jest.fn().mockResolvedValue(mockDoc);

        const modelMock = { findById: findByIdMock } as any;

        const req = {
            params: { id: '123' }
        } as Partial<Request> as Request;

        const res = {} as Response;
        const next = jest.fn();

        const middleware = MongoGet(modelMock);
        await middleware(req, res, next);

        expect(findByIdMock).toHaveBeenCalledWith('123');
        expect(req.mongoGet).toBe(mockDoc);
        expect(req.declaredMethod).toBe('mongoGet');
        expect(next).toHaveBeenCalled();
    });

    it('should return 404 if document not found', async () => {
        const findByIdMock = jest.fn().mockResolvedValue(null);

        const modelMock = { findById: findByIdMock } as any;

        const req = {
            params: { id: 'notfound' }
        } as Partial<Request> as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as Partial<Response> as Response;

        const next = jest.fn();

        const middleware = MongoGet(modelMock);
        await middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Document not found' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 500 if an error occurs', async () => {
        const error = new Error('DB failure');
        const findByIdMock = jest.fn().mockRejectedValue(error);

        const modelMock = { findById: findByIdMock } as any;

        const req = {
            params: { id: 'badid' }
        } as Partial<Request> as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as Partial<Response> as Response;

        const next = jest.fn();

        const middleware = MongoGet(modelMock);
        await middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
        expect(next).not.toHaveBeenCalled();
    });
});

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
