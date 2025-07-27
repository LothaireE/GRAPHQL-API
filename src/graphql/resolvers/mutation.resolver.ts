import Books from '../../data/Books';
import Authors from '../../data/Authors';
import { Author } from '../../types/author.type';
import { Book } from '../../types/book.type';

type NewBookInput = Omit<Book, 'id'>;
type NewAuthorInput = Omit<Author, 'id'>;

const mutationResolvers = {
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
                newBook: NewBookInput;
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
                newAuthor: NewAuthorInput;
            }
        ) {
            console.log('newAuthor', newAuthor);
            const newAuthorObjId = String(Authors.length + 1);
            const newAuthorObj: Author = {
                ...newAuthor,
                id: newAuthorObjId
            };
            console.log('newAuthorObj', newAuthorObj);

            Authors.push(newAuthorObj);
            return newAuthorObj;
        }
    }
};

export default mutationResolvers;
