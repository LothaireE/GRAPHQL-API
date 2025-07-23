import http from 'http';
import mongoose from 'mongoose';
import { mongo, server, TEST } from './config/config';
import './config/logging';
import application from './application';

export let httpServer: ReturnType<typeof http.createServer>;

const nodeEnv: string = process.env.NODE_ENV?.toUpperCase() || '';

export const Main = async () => {
    logging.log('------------------------------------------');
    logging.log(`Initializing API in ${nodeEnv} mode`);
    logging.log('------------------------------------------');
    logging.log('------------------------------------------');
    logging.log('Initializing connection to Mongo');
    logging.log('------------------------------------------');
    if (!TEST) {
        try {
            const connection = await mongoose.connect(
                mongo.MONGO_CONNECTION,
                mongo.MONGO_OPTION
            );
            logging.log('------------------------------------------');
            logging.log(
                `Connected to Mongo using version: ${connection.version}`
            );
            logging.log('------------------------------------------');
        } catch (error) {
            logging.log('------------------------------------------');
            logging.info('Unable to connect to Mongo');
            logging.error(error);
            logging.log('------------------------------------------');
        }
    }

    logging.log('------------------------------------------');
    logging.log('Starting HTTP Server');
    logging.log('------------------------------------------');
    httpServer = http.createServer(application);
    httpServer.listen(server.SERVER_PORT, () => {
        logging.log('------------------------------------------');
        logging.log(
            `Server is running at http://${server.SERVER_HOSTNAME}:${server.SERVER_PORT}`
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
