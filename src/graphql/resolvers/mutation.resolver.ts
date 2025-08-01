import {
    MutationResolvers,
    Author,
    Book,
    BookInput,
    UpdateAuthorInput,
    UpdateBookInput,
    AuthorInput
} from '../generated/types.generated';
import { books, authors } from '../../db/schema';
import { firstElem } from '../../utils/firstItem';
import { eq } from 'drizzle-orm';
import { GraphQLContext } from '../../types/context.type';
import { ERROR_MESSAGES } from '../../constants/messages';

// type NewBookInput = Omit<Book, 'id'>;
// type NewAuthorInput = Omit<Author, 'id'>;

// function cleanData<T extends object>(data: T): Partial<T> {
//     return Object.fromEntries(
//         Object.entries(data).filter(([key, value]) => value !== undefined)
//     ) as Partial<T>;
// }

export const mutationResolvers = <MutationResolvers>{
    Mutation: {
        // Create
        createBook: async (
            _: any,
            args: { newBook: BookInput }, //Book },
            context: GraphQLContext
        ) => {
            // const { token } = context;
            // if (!token) throw new Error(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
            const result = await context.db
                .insert(books)
                .values(args.newBook)
                .returning();
            return firstElem(result);
        },
        createAuthor: async (
            __: any,
            args: { newAuthor: AuthorInput },
            context: GraphQLContext
        ) => {
            // const { token } = context;
            // if (!token) throw new Error(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
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
            const { token } = context;
            if (!token) throw new Error(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
            await context.db.insert(authors).values(args.newAuthors);
        },

        // Update
        updateAuthor: async (
            // __: any,
            parent: Author,
            args: { authorUpdates: UpdateAuthorInput },
            context: GraphQLContext
        ) => {
            const result = await context.db
                .update(authors)
                .set(args.authorUpdates)
                .where(eq(authors.id, args.authorUpdates.id))
                .returning();
            return firstElem(result);
        },
        updateBook: async (
            // __: any,
            parent: Book,
            args: { bookUpdates: UpdateBookInput },
            context: GraphQLContext
        ) => {
            const result = await context.db //Values of undefined are ignored in the object: to set a column to null, pass null.
                .update(books)
                // .set(toUpdate)
                .set(args.bookUpdates)
                .where(eq(books.id, args.bookUpdates.id))
                .returning();

            return firstElem(result);
        },

        // Delete
        deleteSingleAuthor: async (
            __: any,
            args: { id: string },
            context: GraphQLContext
        ) => {
            const { token } = context;
            if (!token) throw new Error(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
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
            const { token } = context;
            if (!token) throw new Error(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
            const result = await context.db
                .delete(books)
                .where(eq(books.id, args.id))
                .returning();
            return firstElem(result);
        },
        deleteAllAuthors: async (
            __: any,
            args: any,
            context: GraphQLContext
        ) => {
            const { token } = context;
            if (!token) throw new Error(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
            await context.db.delete(authors).returning();
        },
        deleteAllBooks: async (__: any, args: any, context: GraphQLContext) => {
            const { token } = context;
            if (!token) throw new Error(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
            await context.db.delete(books).returning();
        }
    }
};
