import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} from '../utils/handleToken';

let refreshTokens: string[] = []; // To be stored in a database or cache at some point

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

        const accessToken = generateAccessToken(email, 'login');

        const refreshToken = generateRefreshToken(email);
        refreshTokens.push(refreshToken);

        return res.status(200).json({
            message: 'User logged in successfully',
            data: {
                // id: user._id,
                email: user.email,
                accessToken,
                refreshToken
            }
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

        return res.status(201).json({
            message: 'User signed up successfully',
            user: {
                // id: newUser._id,
                email: newUser.email,
                name: newUser.name
            }
        });
    }

    static async refreshToken(req: Request, res: Response) {
        const refreshToken = req.body.token; // the refresh token should be stored in a database or cache

        if (!refreshToken)
            return res.status(401).json({ error: 'Refresh token is required' });
        if (!refreshTokens.includes(refreshToken))
            return res
                .status(403)
                .json({ error: 'Refresh token is not valid' });

        try {
            const decodedToken = verifyRefreshToken(refreshToken);
            const newAccessToken = generateAccessToken(
                decodedToken.email,
                'refresh'
            );

            return res.status(201).json({
                message: 'Access token refreshed successfully',
                data: {
                    accessToken: newAccessToken
                }
            });
        } catch (error) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }
    }

    static async logout(req: Request, res: Response) {
        refreshTokens = refreshTokens.filter(
            (token) => token !== req.body.token
        );
        logging.info('User logged out successfully');
        return res.status(204);
    }
}

export default AuthController;
