import request from 'supertest';
import { application, Shutdown } from '../../src/server';

describe('Server Integration Tests', () => {
    afterAll((done) => {
        Shutdown(done); // Shutdown the server after tests
    });

    it('should start with the proper environment', async () => {
        expect(process.env.NODE_ENV).toBe('test');
        expect(application).toBeDefined();
    }, 10000);

    it('main/healthcheck performs correctly and API runs smoothly', async () => {
        const res = await request(application).get('/api/main/healthcheck');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('API is running');
    });

    it('returns all the options allowed to be called by customer (http methods)', async () => {
        const response = await request(application).options('/');
        expect(response.status).toBe(200);
        expect(response.headers['access-control-allow-methods']).toBe(
            'POST, GET, PUT, DELETE, PATCH'
        );
    });

    it('catches all requests that do not match any defined routes', async () => {
        const response = await request(application).get('/non-existent-route');
        expect(response.status).toBe(404);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toContain('Route not found');
        expect(response.body.timestamp).toBeDefined();
    });
});
