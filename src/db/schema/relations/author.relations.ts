import { relations } from 'drizzle-orm';
import { authors, books } from '../schema';

// one-to-many relationship between one Author and all their book
export const authorRelations = relations(authors, ({ many }) => ({
    books: many(books)
}));
