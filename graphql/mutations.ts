import { gql } from "@apollo/client";

export const loginMutationGQL = gql`
  mutation($input: LoginInputType!) {
    login(data: $input) {
      token
    }
  }
`

export const createUserMutationGQL = gql`
  mutation($input: UserInputType!) {
    createUser(data: $input) {
      id,
      name
    }
  }
`

