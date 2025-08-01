import { Router } from 'express';
import AuthController from '../controller/auth.controller';
import { loginSchema } from '../schema/loginSchema';
import { signupSchema } from '../schema/signupSchema';
import { validate } from '../middleware/validate';

const authRouter = Router();

// POST
authRouter.post('/auth/login', validate(loginSchema), AuthController.login);
authRouter.post('/auth/signup', validate(signupSchema), AuthController.signup);
authRouter.post('/auth/refresh', AuthController.refreshToken);
authRouter.post('/auth/logout', AuthController.logout);

export default authRouter;
