
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: "http://localhost:3305/graphql",
    documents: "lib/graphql/queries/**/*.graphql",
    generates: {
        "lib/graphql/generated.ts": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-query",
            ],
            config: {
                fetcher: {
                    func: "@/lib/graphql/client#fetcher",
                },
                exposeQueryKeys: true,
                exposeFetcher: true,
                reactQueryVersion: 5,
            },
        },
        "lib/graphql/schema.json": {
            plugins: ["introspection"],
        },
    },
};

export default config;
