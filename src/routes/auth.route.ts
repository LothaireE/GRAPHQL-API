import { Router } from 'express';
import { login, signup } from '../controller/auth.controller';
import { loginSchema } from '../schema/loginSchema';
import { signupSchema } from '../schema/signupSchema';
import { validate } from '../middleware/validate';
// This file sets up the authentication routes for the application.
// It imports the necessary modules, defines the routes, and exports the router for use in the main application.

// Create a new router instance
const authRouter = Router();

// POST
authRouter.post('/auth/login', validate(loginSchema), login);
authRouter.post('/auth/signup', validate(signupSchema), signup);

export default authRouter;
