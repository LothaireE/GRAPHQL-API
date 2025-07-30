import db from '../db/db';

export type GraphQLContext = {
    db: typeof db;
};
