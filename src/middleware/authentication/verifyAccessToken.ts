import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/config';
import { AuthorizedUser } from '../../types/user';

export function verifyAccessToken(schema: any = null) {
    return async function (req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader)
            return res
                .status(401)
                .json({ error: 'Authorization header is missing' });

        const token = authHeader.split(' ')[1];

        try {
            const verifiedUser = jwt.verify(
                token,
                JWT_SECRET
            ) as AuthorizedUser;
            req.authorizedUser = verifiedUser;
            next();
        } catch (error) {
            res.status(403).json({ error: 'Invalid token' });
        }
    };
}
