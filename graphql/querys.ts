import { gql } from "@apollo/client";

export const usersQueryGQL = gql`
  query {
    users {
      nodes {
        name,
        email,
        id
      }
    }
  }
`
