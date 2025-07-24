import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/config';

export function verifyAccessToken(schema: any = null) {
    return async function (req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader)
            return res
                .status(401)
                .json({ error: 'Authorization header is missing' });

        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
            if (err) return res.status(403).json({ error: 'Invalid token' });
            req.authorizedUser = user;
        });
        next();
    };
}
