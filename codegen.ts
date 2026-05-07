import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../sae-backend/src/schema.gql",
  documents: [
    "lib/graphql/operations/**/*.graphql",
    "lib/graphql/queries/**/*.graphql",
  ],
  generates: {
    "lib/graphql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        fetch: "@/lib/graphql/client#customFetch",
        reactQueryVersion: 5,
        exposeFetcher: false,
        exposeQueryKeys: true,
        addExplicitGenericToOperationCalls: true,
      },
    },
    "lib/graphql/schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
