import http from 'http';
import { server, TEST } from './config/config';
import './config/logging';
import application from './application';

// graphQL
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import resolvers from './graphql/resolvers/index';
import typeDefs from './graphql/typeDefs/bookTypeDefs';

export let httpServer: ReturnType<typeof http.createServer>; // = http.createServer(application);

httpServer = http.createServer(application);

let apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

const nodeEnv: string = process.env.NODE_ENV?.toUpperCase() || '';

export const Main = async () => {
    logging.log('------------------------------------------');
    logging.log(`Initializing Node Graphql API in ${nodeEnv} mode`);
    logging.log('------------------------------------------');

    await apolloServer.start();
    application.use(expressMiddleware(apolloServer));

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
