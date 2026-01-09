import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:3305/graphql";

export const graphQLClient = new GraphQLClient(endpoint);

export const fetcher = <TData, TVariables>(
    query: string,
    variables?: TVariables,
    headers?: RequestInit["headers"]
) => {
    return async (): Promise<TData> => {
        return graphQLClient.request<TData>(query, variables as any, headers as any);
    };
};
