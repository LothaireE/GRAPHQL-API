import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const PRODUCTION = process.env.NODE_ENV === 'production';
export const TEST = process.env.NODE_ENV === 'test';

// JWT Configuration
export const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || ''; // 'default_refresh_token';

// MongoDB Configuration
export const MONGO_USER = process.env.MONGO_USER || '';
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
export const MONGO_URL = process.env.MONGO_URL || '';
export const MONGO_DATABASE = process.env.MONGO_DATABASE || '';
export const MONGO_OPTION: mongoose.ConnectOptions = {
    retryWrites: true,
    w: 'majority'
};

export const mongo = {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_URL,
    MONGO_DATABASE,
    MONGO_OPTION,
    MONGO_CONNECTION: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DATABASE}`
};

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
export const AUTH_SERVER_PORT = process.env.AUTH_SERVER_PORT
    ? Number(process.env.AUTH_SERVER_PORT)
    : 4000;
export const AUTH_SERVER_HOSTNAME =
    process.env.AUTH_SERVER_HOSTNAME || 'localhost';

export const authServer = {
    SERVER_HOSTNAME: AUTH_SERVER_HOSTNAME,
    SERVER_PORT: AUTH_SERVER_PORT
};
