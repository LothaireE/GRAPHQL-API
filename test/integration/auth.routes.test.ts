import request from 'supertest';
import { application, Shutdown } from '../../src/server';

describe('Auth Routes Integration Tests', () => {
    afterAll((done) => {
        Shutdown(done); // Shutdown the server after tests
    });

    it('should start with the proper environment', async () => {
        expect(process.env.NODE_ENV).toBe('test');
        expect(application).toBeDefined();
    }, 10000);

    it('POST /api/auth/signup creates a new user', async () => {
        const res = await request(application)
            .post('/api/auth/signup')
            .send({ email: 'test@mail.com', password: '1234' });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('User signed up successfully');
    });

    it('POST /api/auth/login logs in an existing user', async () => {
        const res = await request(application)
            .post('/api/auth/login')
            .send({ email: 'test@mail.com', password: '1234' });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Logged in successfully');
    });
});
