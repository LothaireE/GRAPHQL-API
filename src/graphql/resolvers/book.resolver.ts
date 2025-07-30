import { authors } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { Book, BookResolvers } from '../generated/types.generated';
import { GraphQLContext } from '../../types/context.type';

export const bookResolvers = <BookResolvers>{
    Book: {
        author: async (parent: Book, args: {}, context: GraphQLContext) =>
            await context.db.query.authors.findFirst({
                where: eq(authors.id, parent.authorId)
            })
    }
};
