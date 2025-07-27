export const bookTypeDefs = `
    type Book {
        id: ID!
        title: String!
        author: Author
        authorId: ID!
    }

    input BookInput {
        title: String!
        authorId: ID!
    }
`;

export const authorTypeDefs = `
    type Author {
        id: ID!
        name: String!
        books: [Book]
    }
    
    input AuthorInput {
        name: String!
    }
`;

export const queryTypeDefs = `
    type Query {
        hello: String
        authors: [Author]
        books: [Book]
        book(id:ID!): Book 
        author(id:ID!): Author
    }
`;

export const mutationTypeDefs = `
    type Mutation {
        hello(message: String) : String
        createBook(newBook: BookInput!): Book
        createAuthor(newAuthor: AuthorInput!): Author
    }
`;

// could have it's own file at some point
const typeDefs = [
    bookTypeDefs,
    authorTypeDefs,
    queryTypeDefs,
    mutationTypeDefs
];
export default typeDefs;
