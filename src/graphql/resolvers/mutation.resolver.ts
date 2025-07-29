import Books from '../../data/Books';
import Authors from '../../data/Authors';
import { Author, Book } from '../generated/types.generated';
import { MutationResolvers } from '../generated/types.generated';

// type NewBookInput = Omit<Book, 'id'>;
// type NewAuthorInput = Omit<Author, 'id'>;

export const mutationResolvers = <MutationResolvers>{
    Mutation: {
        hello: (_: any, { message }: { message: string }) => {
            const helloMessage = message;
            return helloMessage;
        },

        createBook(
            _: any,
            {
                newBook
            }: {
                newBook: Book;
            }
        ) {
            const newBookObjId = String(Books.length + 1);
            const newBookObj: Book = {
                ...newBook,
                id: newBookObjId
            };

            Books.push(newBookObj);
            return newBookObj;
        },

        createAuthor(
            _: any,
            {
                newAuthor
            }: {
                newAuthor: Author;
            }
        ) {
            const newAuthorObjId = String(Authors.length + 1);
            const newAuthorObj: Author = {
                ...newAuthor,
                id: newAuthorObjId
            };

            Authors.push(newAuthorObj);
            return newAuthorObj;
        }
    }
};
