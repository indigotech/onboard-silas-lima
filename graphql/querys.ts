import { gql } from "@apollo/client";

export const usersQueryGQL = gql`
  query($input: PageInputType) {
    users(pageInfo: $input) {
      nodes {
        id,
        name,
        email
      }
    }
  }
`

export const userQueryGQL = gql`
  query($input: ID!) {
    user(id: $input) {
      name,
      phone,
      email,
      birthDate,
      role
    }
  }
`
