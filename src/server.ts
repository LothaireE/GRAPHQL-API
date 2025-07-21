import http from 'http';
import express from 'express';
import logging from './config/logging';
import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import setupRoutes from './routes/routes';

export const application = express();

export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    logging.info('------------------------------');
    logging.info('Initializing API');
    logging.info('------------------------------');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());

    logging.info('------------------------------');
    logging.info('Logging and Configuration');
    logging.info('------------------------------');
    application.use(loggingHandler);
    application.use(corsHandler);

    logging.info('------------------------------');
    logging.info('Setup Routes and Controllers');
    logging.info('------------------------------');
    setupRoutes(application); // setupRoutes(controllers, application, routes);

    logging.info('------------------------------');
    logging.info('Starting HTTP Server');
    logging.info('------------------------------');
    httpServer = http.createServer(application);
    httpServer.listen(process.env.SERVER_PORT, () => {
        logging.info('------------------------------');
        logging.info(
            `Server is running at http://${
                process.env.SERVER_HOSTNAME || 'localhost'
            }:${process.env.SERVER_PORT || 3000}`
        );
        logging.info('------------------------------');
    });
};

export const Shutdown = (callback: any) =>
    httpServer &&
    httpServer.close((err) => {
        if (err) {
            logging.error('Error shutting down server:', err);
            return callback(err);
        }
        logging.info('Server shut down gracefully');
        callback();
    });

Main();
