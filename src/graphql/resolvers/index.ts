import { mergeResolvers } from '@graphql-tools/merge';
import bookResolvers from './book.resolver';
import authorResolvers from './author.resolver';
import mutationResolvers from './mutation.resolver';
import queryResolvers from './query.resolver';

const resolvers = mergeResolvers([
    queryResolvers,
    mutationResolvers,
    bookResolvers,
    authorResolvers
]);

export default resolvers;
