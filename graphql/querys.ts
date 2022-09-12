import { gql } from "@apollo/client";

export const usersQueryGQL = gql`
  query($input: PageInputType) {
    users(pageInfo: $input) {
      nodes {
        name,
        email,
        id
      }
    }
  }
`
