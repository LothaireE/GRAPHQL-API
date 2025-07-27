import Authors from '../../data/Authors';
import Books from '../../data/Books';

let helloMessage: String = 'World depuis le resolver distant!';

const queryResolvers = {
    Query: {
        hello: () => helloMessage,
        books: () => Books,
        authors: () => Authors,
        book: (_: any, args: { id: string }) =>
            Books.find((book) => String(book.id) === args.id),
        author: (_: any, args: { id: string }) =>
            Authors.find((author) => String(author.id) === args.id)
    }
};

export default queryResolvers;
