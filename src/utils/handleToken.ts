import jwt from 'jsonwebtoken';
import { JWT_SECRET, REFRESH_TOKEN_SECRET } from '../config/config';
import { TEST } from '../config/config';
// export function generateAccessToken(email: string): string {
export function generateAccessToken(
    email: string,
    source: 'login' | 'refresh' | 'test'
): string {
    // use ID instead of email once accessible

    !TEST && logging.info(`source: ${source}`);
    if (source === 'test')
        jwt.sign({ email, source }, JWT_SECRET, { expiresIn: '1min' });

    return jwt.sign({ email, source }, JWT_SECRET, { expiresIn: '15min' });
}

export function generateRefreshToken(email: string): string {
    return jwt.sign({ email, source: 'refresh' }, REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    });
}

export function verifyRefreshToken(refreshToken: string) {
    return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as {
        email: string;
        source: string;
        iat: number;
        exp: number;
    };
}
