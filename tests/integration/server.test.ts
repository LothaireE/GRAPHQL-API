import request from 'supertest';
import { router, Shutdown } from '../../src/server';

describe('Server Integration Tests', () => {
    // beforeAll(() => {
    //     // Initialize the server
    //     router.listen(process.env.SERVER_PORT || 3000);
    // });

    afterAll((done) => {
        Shutdown(done); // Shutdown the server after tests
    });

    it('should start with the proper environment', async () => {
        expect(process.env.NODE_ENV).toBe('test');
        expect(router).toBeDefined();
    }, 10000);

    it('returns all the options allowed to be called by customer (http methods)', async () => {
        // const response = await request(router).options('/api/v1/health');
        const response = await request(router).options('/');
        expect(response.status).toBe(200);
        expect(response.headers['access-control-allow-methods']).toBe(
            'POST, GET, PUT, DELETE, PATCH'
        );
    });
});
