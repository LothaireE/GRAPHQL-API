import Authors from '../../data/Authors';
import Books from '../../data/Books';
import { QueryResolvers } from '../generated/types.generated';
let helloMessage: String = 'World !';

export const queryResolvers = <QueryResolvers>{
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
