import { MutationResolvers, Author, Book } from '../generated/types.generated';
import { books, authors } from '../../db/schema';
import { firstElem } from '../../utils/firstItem';
import { eq } from 'drizzle-orm';
import { GraphQLContext } from '../../types/context.type';

// type NewBookInput = Omit<Book, 'id'>;
// type NewAuthorInput = Omit<Author, 'id'>;

export const mutationResolvers = <MutationResolvers>{
    Mutation: {
        createBook: async (
            _: any,
            args: { newBook: any }, //Book },
            context: GraphQLContext
        ) => {
            // await db.insert(books).values(args.newBook).returning() // returning in drizzle returns an array even for a single item... schade
            const result = await context.db
                .insert(books)
                .values(args.newBook)
                .returning();

            const data = firstElem(result);

            return data;
        },
        createAuthor: async (
            __: any,
            args: { newAuthor: Author },
            context: GraphQLContext
        ) => {
            const result = await context.db
                .insert(authors)
                .values(args.newAuthor)
                .returning();
            return firstElem(result);
        },
        createManyAuthors: async (
            __: any,
            args: { newAuthors: [Author] },
            context: GraphQLContext
        ) => {
            await context.db.insert(authors).values(args.newAuthors);
        },

        // Delete
        deleteSingleAuthor: async (
            __: any,
            args: { id: string },
            context: GraphQLContext
        ) => {
            const result = await context.db
                .delete(authors)
                .where(eq(authors.id, args.id))
                .returning();
            return firstElem(result);
        },
        deleteSingleBook: async (
            __: any,
            args: { id: string },
            context: GraphQLContext
        ) => {
            const result = await context.db
                .delete(books)
                .where(eq(books.id, args.id))
                .returning({ deletedId: books.id });
            return firstElem(result);
        },
        deleteAllAuthors: async (__: any, args: any, context: GraphQLContext) =>
            await context.db.delete(authors).returning(),
        deleteAllBooks: async (__: any, args: any, context: GraphQLContext) =>
            await context.db.delete(books).returning()
    }
};
