import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';

class AuthController {
    static async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await UserModel.findOne(email);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const accessToken = jwt.sign(email, JWT_SECRET);
        // no expiration for now, but should be set later in production
        // const accessToken = jwt.sign(email, JWT_SECRET, {expiresIn: '12h'});

        return res.status(200).json({
            message: 'User logged in successfully',
            data: {
                // id: user._id,
                email: user.email,
                accessToken
            },
            timestamp: new Date().toISOString()
        });
    }

    static async signup(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const existing = await UserModel.findOne(email);
        if (existing) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword
        });

        logging.info(`User ${newUser.name} signed up successfully`);
        const allUsers = UserModel.findAll();

        return res.status(201).json({
            message: 'User signed up successfully',
            user: {
                // id: newUser._id,
                email: newUser.email,
                name: newUser.name
            },
            timestamp: new Date().toISOString()
        });
    }
}

export default AuthController;
