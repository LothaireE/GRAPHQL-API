import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: ['src/graphql/typeDefs/**/*.graphql'],
    generates: {
        'src/graphql/generated/types.generated.ts': {
            plugins: ['typescript', 'typescript-resolvers']
        }
    }
};

export default config;
