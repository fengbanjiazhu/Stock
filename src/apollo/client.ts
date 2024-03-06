import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";
import { STEPZEN_API_KEY } from "@env";

const client = new ApolloClient({
  uri: "https://gadivemula.stepzen.net/api/ulterior-octopus/__graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Apikey ${STEPZEN_API_KEY}`,
  },
});

export default client;
