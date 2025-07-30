import { books, genres, bookGenres } from '../schema';
import { relations } from 'drizzle-orm';

export const bookGenreRelations = relations(bookGenres, ({ one }) => ({
    book: one(books, {
        fields: [bookGenres.bookId],
        references: [books.id]
    }),
    genre: one(genres, {
        fields: [bookGenres.genreId],
        references: [genres.id]
    })
}));
