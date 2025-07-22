import { Request, Response } from 'express';

class AuthController {
    static login(req: Request, res: Response) {
        const { name } = req.body;
        logging.info(`User ${name} logged in successfully`);

        return res.status(200).json({
            message: 'User logged in successfully',
            timestamp: new Date().toISOString()
        });
    }

    static signup(req: Request, res: Response) {
        // // logic to implement here
        const { name } = req.body;
        logging.info(`User ${name} signed up successfully`);

        return res.status(201).json({
            message: 'User signed up successfully',
            timestamp: new Date().toISOString()
        });
    }
}

export default AuthController;
