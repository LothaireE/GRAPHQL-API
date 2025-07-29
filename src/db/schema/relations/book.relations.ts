import { relations } from 'drizzle-orm';
import { authors, books, genres } from '../schema';

// many-to-one relationship between one Author and their books
// many-to-many relationship between books and genres

export const bookRelations = relations(books, ({ one, many }) => ({
    author: one(authors, {
        fields: [books.authorId],
        references: [authors.id]
    }),
    genre: many(genres)
}));
