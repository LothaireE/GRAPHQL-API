import dotenv from 'dotenv';

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const PRODUCTION = process.env.NODE_ENV === 'production';
export const TEST = process.env.NODE_ENV === 'test';

// JWT Configuration
export const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || ''; // 'default_refresh_token';

// MongoDB Configuration

// Server Configuration
export const SERVER_PORT = process.env.SERVER_PORT
    ? Number(process.env.SERVER_PORT)
    : 3000;
export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';

export const server = {
    SERVER_HOSTNAME,
    SERVER_PORT
};

// Auth Server Configuration
export const AUTH_SERVER_LABEL = 'AUTH SERVER';
export const AUTH_SERVER_PORT = process.env.AUTH_SERVER_PORT
    ? Number(process.env.AUTH_SERVER_PORT)
    : 4000;
export const AUTH_SERVER_HOSTNAME =
    process.env.AUTH_SERVER_HOSTNAME || 'localhost';

export const authServer = {
    SERVER_HOSTNAME: AUTH_SERVER_HOSTNAME,
    SERVER_PORT: AUTH_SERVER_PORT
};
