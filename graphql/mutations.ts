import { gql } from "@apollo/client";

export const loginMutationGQL = gql`
  mutation($input: LoginInputType!) {
    login(data: $input) {
      token
    }
  }
`
