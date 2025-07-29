import { mergeResolvers } from '@graphql-tools/merge';
import { bookResolvers } from './resolvers/book.resolver';
import { authorResolvers } from './resolvers/author.resolver';
import { mutationResolvers } from './resolvers/mutation.resolver';
import { queryResolvers } from './resolvers/query.resolver';

export const resolvers = mergeResolvers([
    queryResolvers,
    mutationResolvers,
    bookResolvers,
    authorResolvers
]);
