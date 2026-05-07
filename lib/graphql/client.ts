import { getSession } from "next-auth/react";

const endpoint =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:3305/graphql";

export interface GraphQLRequestOptions {
  query: string;
  variables?: Record<string, unknown>;
}

/**
 * Custom fetch function for @graphql-codegen/react-query plugin
 * Automatically includes auth headers from NextAuth session
 */
export async function customFetch<T>({
  query,
  variables,
}: GraphQLRequestOptions): Promise<T> {
  const session = await getSession();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (session?.accessToken) {
    headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message || "GraphQL Error");
  }

  return json.data;
}
