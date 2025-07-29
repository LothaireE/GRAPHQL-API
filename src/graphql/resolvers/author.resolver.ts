import Books from '../../data/Books';

export const authorResolvers = {
    Author: {
        books: (author: any) =>
            Books.filter((book) => book.authorId === author.id)
    }
};
