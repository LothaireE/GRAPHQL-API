import {
    serial,
    text,
    timestamp,
    integer,
    pgTable,
    varchar
} from 'drizzle-orm/pg-core';

const timestamps = {
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deleted_at: timestamp()
};

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 255 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    ...timestamps
});

export const authors = pgTable('authors', {
    id: serial('id').primaryKey(),
    firstName: varchar('first_name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    ...timestamps
});

export const books = pgTable('books', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    publicationYear: integer('publication_year').notNull(), //
    authorId: integer('author_id').references(() => authors.id),
    description: text('description'),
    ...timestamps
});

export const genres = pgTable('genres', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull().unique(),
    ...timestamps
});

export const bookGenres = pgTable('book_genres', {
    bookId: integer('book_id').references(() => books.id),
    genreId: integer('genre_id').references(() => genres.id),
    ...timestamps
});

export const refreshTokens = pgTable('refresh_token', {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
        .notNull()
        .references(() => users.id),
    token: varchar('token', { length: 512 }).notNull().unique(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    expiresAt: timestamp('expires_at').notNull()
});
