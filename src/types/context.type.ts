import db from '../db/db';
import { AuthorizedUser } from './user';

export type GraphQLContext = {
    db: typeof db;
    token: AuthorizedUser | null;
};
