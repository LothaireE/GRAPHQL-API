import { mergeResolvers } from '@graphql-tools/merge';
import { Resolvers } from './generated/types.generated';
import { GraphQLContext } from '../types/context.type';
import { bookResolvers } from './resolvers/book.resolver';
import { authorResolvers } from './resolvers/author.resolver';
import { mutationResolvers } from './resolvers/mutation.resolver';
import { queryResolvers } from './resolvers/query.resolver';

export const resolvers: Resolvers<GraphQLContext> = mergeResolvers([
    queryResolvers,
    mutationResolvers,
    bookResolvers,
    authorResolvers
]);
