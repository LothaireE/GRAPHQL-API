import { Request, Response } from 'express';
// import logging from '../config/logging';

export function login(req: Request, res: Response) {
    // // logic to implement here
    const { name } = req.body;

    logging.info(`User ${name} logged in successfully`);

    // // Return a success response
    // // Would also generate a token here and send it back to the client
    return res.status(200).json({
        message: 'Logged in successfully',
        timestamp: new Date().toISOString()
    });
}

export function signup(req: Request, res: Response) {
    // // logic to implement here
    const { name } = req.body;

    // // Save the user to a database

    logging.info(`User ${name} signed up successfully`);

    // // Return a success response
    // // Would also generate a token here and send it back to the client

    return res.status(201).json({
        message: 'User signed up successfully',
        timestamp: new Date().toISOString()
    });
}
