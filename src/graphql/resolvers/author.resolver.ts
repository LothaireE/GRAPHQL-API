import { GraphQLContext } from '../../types/context.type';
import { books } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { AuthorResolvers } from '../generated/types.generated';
import { Author } from '../generated/types.generated';

export const authorResolvers = <AuthorResolvers>{
    Author: {
        books: async (parent: Author, args: {}, context: GraphQLContext) =>
            await context.db.query.books.findMany({
                where: eq(books.authorId, parent.id)
            })
    }
};
