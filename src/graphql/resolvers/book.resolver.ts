import Authors from '../../data/Authors';

export const bookResolvers = {
    Book: {
        author: (book: any) =>
            Authors.find((author) => author.id === book.authorId)
    }
};
