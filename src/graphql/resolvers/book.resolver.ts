import Authors from '../../data/Authors';

const bookResolvers = {
    Book: {
        author: (book: any) =>
            Authors.find((author) => author.id === book.authorId)
    }
};

export default bookResolvers;
