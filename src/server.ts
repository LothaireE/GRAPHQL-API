import http from 'http';
import express from 'express';
// import './config/config';
// import  './config/logging';
import logging from './config/logging';

// import * as logging from './config/logging';
import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { routeNotFound } from './middleware/routeNotFound';

export const router = express();
// export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    logging.info('------------------------------');
    logging.info('Initializing API');
    logging.info('------------------------------');
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    logging.info('------------------------------');
    logging.info('Logging and Configuration');
    logging.info('------------------------------');
    router.use(loggingHandler);
    router.use(corsHandler);

    logging.info('------------------------------');
    logging.info('Define Controllers and Routes');
    logging.info('------------------------------');
    router.get('/main/healthCheck', (req, res) => {
        return res.status(200).json({
            message: 'API is running',
            timestamp: new Date().toISOString()
        });
    });

    logging.info('------------------------------');
    logging.info('Define Middleware and Error Handlers');
    logging.info('------------------------------');
    router.use(routeNotFound);

    logging.info('------------------------------');
    logging.info('Starting HTTP Server');
    logging.info('------------------------------');
    httpServer = http.createServer(router);
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
