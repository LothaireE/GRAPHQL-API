import { Router } from 'express';
import AuthController from '../controller/auth.controller';
import { loginSchema } from '../schema/loginSchema';
import { signupSchema } from '../schema/signupSchema';
import { validate } from '../middleware/validate';
// This file sets up the authentication routes for the application.
// It imports the necessary controllers and schemas, and uses the validate middleware to ensure that incoming requests meet the validation criteria.

// Create a new router instance
const authRouter = Router();

// POST
authRouter.post('/auth/login', validate(loginSchema), AuthController.login);
authRouter.post('/auth/signup', validate(signupSchema), AuthController.signup);

export default authRouter;
