import { genres, bookGenres } from '../schema';
import { relations } from 'drizzle-orm';

export const genreRelations = relations(genres, ({ many }) => ({
    books: many(bookGenres)
}));
