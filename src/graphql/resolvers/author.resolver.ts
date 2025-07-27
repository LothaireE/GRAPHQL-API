import Books from '../../data/Books';

const authorResolvers = {
    Author: {
        books: (author: any) =>
            Books.filter((book) => book.authorId === author.id)
    }
};

export default authorResolvers;
