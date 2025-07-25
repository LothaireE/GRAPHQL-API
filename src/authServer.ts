import http from 'http';
import mongoose from 'mongoose';
import { mongo, authServer, TEST } from './config/config';
import './config/logging';
import authApplication from './authApplication';

export let httpServer: ReturnType<typeof http.createServer>;

const nodeEnv: string = process.env.NODE_ENV?.toUpperCase() || '';

const serverLabel = 'AUTH SERVER';

export const Main = async () => {
    logging.log('------------------------------------------', serverLabel);
    logging.log(`Initializing auth Server in ${nodeEnv} mode`);
    logging.log('------------------------------------------', serverLabel);
    // logging.log('------------------------------------------', serverLabel);
    // logging.log('Initializing connection to Mongo', serverLabel);
    // logging.log('------------------------------------------', serverLabel);
    // if (!TEST) {
    //     try {
    //         const connection = await mongoose.connect(
    //             mongo.MONGO_CONNECTION,
    //             mongo.MONGO_OPTION
    //         );
    //         logging.log('------------------------------------------', serverLabel);
    //         logging.log(
    //             `Connected to Mongo using version: ${connection.version}`
    //         );
    //         logging.log('------------------------------------------', serverLabel);
    //     } catch (error) {
    //         logging.log('------------------------------------------', serverLabel);
    //         logging.info('Unable to connect to Mongo', serverLabel);
    //         logging.error(error);
    //         logging.log('------------------------------------------', serverLabel);
    //     }
    // }

    logging.log('------------------------------------------', serverLabel);
    logging.log('Starting HTTP Server', serverLabel);
    logging.log('------------------------------------------', serverLabel);
    httpServer = http.createServer(authApplication);
    httpServer.listen(authServer.SERVER_PORT, () => {
        logging.log('------------------------------------------', serverLabel);
        logging.log(
            `Server is running at http://${authServer.SERVER_HOSTNAME}:${authServer.SERVER_PORT}`
        );
        logging.log('------------------------------------------', serverLabel);
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
