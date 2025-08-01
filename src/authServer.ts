import http from 'http';
import {
    TEST,
    AUTH_SERVER_LABEL,
    NODE_ENV,
    POSTGRES_PORT,
    pool,
    authServer
} from './config/config';
import './config/logging';
import authApplication from './authApplication';

export let httpServer: ReturnType<typeof http.createServer>;
httpServer = http.createServer(authApplication);

export const Main = async () => {
    logging.log(
        '------------------------------------------',
        AUTH_SERVER_LABEL
    );
    logging.log(`Initializing auth Server in ${NODE_ENV} mode`);
    logging.log(
        '------------------------------------------',
        AUTH_SERVER_LABEL
    );
    logging.log(
        '------------------------------------------',
        AUTH_SERVER_LABEL
    );
    logging.log('Initializing connection to Postgres', AUTH_SERVER_LABEL);
    logging.log(
        '------------------------------------------',
        AUTH_SERVER_LABEL
    );
    if (!TEST) {
        try {
            const client = await pool.connect();
            logging.log('------------------------------------------');
            logging.log(
                `PostgreSQL connection successfully on port:${POSTGRES_PORT}`
            );
            logging.log('------------------------------------------');
            client.release();
        } catch (error) {
            logging.log(
                '------------------------------------------',
                AUTH_SERVER_LABEL
            );
            logging.info('Unable to connect to Postgres', AUTH_SERVER_LABEL);
            logging.error(error);
            logging.log(
                '------------------------------------------',
                AUTH_SERVER_LABEL
            );
        }
    }

    logging.log(
        '------------------------------------------',
        AUTH_SERVER_LABEL
    );
    logging.log('Starting HTTP Server', AUTH_SERVER_LABEL);
    logging.log(
        '------------------------------------------',
        AUTH_SERVER_LABEL
    );
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
