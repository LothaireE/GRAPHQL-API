import { QueryResolvers } from '../generated/types.generated';
import { books, authors } from '../../db/schema/';
import db from '../../db/db';
import { eq } from 'drizzle-orm';
import { GraphQLContext } from '../../types/context.type';

export const queryResolvers = <QueryResolvers>{
    Query: {
        authors: (_: any, __: any, context: GraphQLContext) => {
            context.db.select().from(authors);
        },
        books: (_: any, __: any, context: GraphQLContext) =>
            context.db.select().from(books),

        book: (_: any, args: { id: string }, context: GraphQLContext) =>
            context.db.query.books.findFirst({
                where: eq(books.id, args.id)
            }),
        author: (_: any, args: { id: string }, context: GraphQLContext) =>
            context.db.query.authors.findFirst({
                where: eq(authors.id, args.id)
            })
    }
};
