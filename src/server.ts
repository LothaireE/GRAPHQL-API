import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import { mongo, server } from './config/config';
import './config/logging';
import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { declareHandler } from './middleware/declareHandler';
import setupRoutes from './routes/routes';

export const application = express();

export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
    logging.log('------------------------------------------');
    logging.log(
        `Initializing API in ${process.env.NODE_ENV?.toUpperCase()} mode`
    );
    logging.log('------------------------------------------');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());
    logging.log('------------------------------------------');
    logging.log('Initializing connection to Mongo');
    logging.log('------------------------------------------');
    try {
        const connection = await mongoose.connect(
            mongo.MONGO_CONNECTION,
            mongo.MONGO_OPTION
        );
        logging.log('------------------------------------------');
        logging.log(`Connected to Mongo using version: ${connection.version}`);
        logging.log('------------------------------------------');
    } catch (error) {
        logging.log('------------------------------------------');
        logging.info('Unable to connect to Mongo');
        logging.error(error);
        logging.log('------------------------------------------');
    }

    logging.log('------------------------------------------');
    logging.log('Logging and Configuration');
    logging.log('------------------------------------------');
    application.use(loggingHandler);
    application.use(corsHandler);
    application.use(declareHandler); // middleware used to declare handlers for specific routes or functionalities(e.g., MongoDB operations in this case)

    logging.log('------------------------------------------');
    logging.log('Setup Routes and Controllers');
    logging.log('------------------------------------------');
    setupRoutes(application); // setupRoutes(controllers, application, routes);

    logging.log('------------------------------------------');
    logging.log('Starting HTTP Server');
    logging.log('------------------------------------------');
    httpServer = http.createServer(application);
    httpServer.listen(process.env.SERVER_PORT, () => {
        logging.log('------------------------------------------');
        logging.log(
            `Server is running at http://${
                server.SERVER_HOSTNAME || 'localhost'
            }:${server.SERVER_PORT}`
        );
        logging.log('------------------------------------------');
    });
};

export const Shutdown = (callback: any) =>
    httpServer &&
    httpServer.close((err) => {
        if (err) {
            logging.error('Error shutting down server:', err);
            return callback(err);
        }
        logging.log('Server shut down gracefully');
        callback();
    });

Main();
