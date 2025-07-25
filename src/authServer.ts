import http from 'http';
import mongoose from 'mongoose';
import { mongo, authServer, TEST, AUTH_SERVER_LABEL } from './config/config';
import './config/logging';
import authApplication from './authApplication';

export let httpServer: ReturnType<typeof http.createServer>;

const nodeEnv: string = process.env.NODE_ENV?.toUpperCase() || '';

export const Main = async () => {
    logging.log(
        '------------------------------------------',
        AUTH_SERVER_LABEL
    );
    logging.log(`Initializing auth Server in ${nodeEnv} mode`);
    logging.log(
        '------------------------------------------',
        AUTH_SERVER_LABEL
    );
    // logging.log('------------------------------------------', AUTH_SERVER_LABEL);
    // logging.log('Initializing connection to Mongo', AUTH_SERVER_LABEL);
    // logging.log('------------------------------------------', AUTH_SERVER_LABEL);
    // if (!TEST) {
    //     try {
    //         const connection = await mongoose.connect(
    //             mongo.MONGO_CONNECTION,
    //             mongo.MONGO_OPTION
    //         );
    //         logging.log('------------------------------------------', AUTH_SERVER_LABEL);
    //         logging.log(
    //             `Connected to Mongo using version: ${connection.version}`
    //         );
    //         logging.log('------------------------------------------', AUTH_SERVER_LABEL);
    //     } catch (error) {
    //         logging.log('------------------------------------------', AUTH_SERVER_LABEL);
    //         logging.info('Unable to connect to Mongo', AUTH_SERVER_LABEL);
    //         logging.error(error);
    //         logging.log('------------------------------------------', AUTH_SERVER_LABEL);
    //     }
    // }

    logging.log(
        '------------------------------------------',
        AUTH_SERVER_LABEL
    );
    logging.log('Starting HTTP Server', AUTH_SERVER_LABEL);
    logging.log(
        '------------------------------------------',
        AUTH_SERVER_LABEL
    );
    httpServer = http.createServer(authApplication);
    httpServer.listen(authServer.SERVER_PORT, () => {
        logging.log(
            '------------------------------------------',
            AUTH_SERVER_LABEL
        );
        logging.log(
            `Server is running at http://${authServer.SERVER_HOSTNAME}:${authServer.SERVER_PORT}`
        );
        logging.log(
            '------------------------------------------',
            AUTH_SERVER_LABEL
        );
    });
};

export const Shutdown = (callback: any) =>
    httpServer &&
    httpServer.close((err) => {
        if (err) {
            logging.error('Error shutting down server:', err);
            return callback(err);
        }
        logging.log('Server shut down gracefully', 'authServer');
        callback();
    });

Main();
