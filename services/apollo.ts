import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getValue } from "../persistency";

const httpLink = createHttpLink({
    uri: 'https://tq-template-server-sample.herokuapp.com/graphql'
});

const authLink = setContext(async (_, { headers }) => {
    const token =  await getValue('@token');
    return {
      headers: {
        ...headers,
        authorization: token ? token : "",
      }
    }
  });

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});
