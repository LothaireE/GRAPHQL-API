import { Router } from 'express';
import { login, signup } from '../controller/auth.controller';

// This file sets up the authentication routes for the application.
// It imports the necessary modules, defines the routes, and exports the router for use in the main application.

// Create a new router instance
const authRouter = Router();

// POST
authRouter.post('/auth/login', login);
authRouter.post('/auth/signup', signup);

export default authRouter;
