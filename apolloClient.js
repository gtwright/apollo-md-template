import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import fetch from "isomorphic-unfetch";

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_URI,
    credentials: "same-origin",
    fetch,
  });
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    connectToDevTools: true,
    link: httpLink,
    cache: new InMemoryCache().restore(initialState),
  });
}
