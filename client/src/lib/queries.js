import { gql } from "@apollo/client"
export const CHECK_DUPLICATE = gql`
  query checkDuplicate($email: String!, $username: String!) {
    users(where: { _or: [{ username: { _eq: $username } }, { email: { _eq: $email } }] }) {
      email
      username
    }
  }
`

export const CHECK_EMAIL = gql`
  query checkEmail($email: String!) {
    users(where: { email: { _eq: $email } }) {
      email
    }
  }
`
export const GET_USERNAME = gql`
  query getUsername($issuer: String!) {
    users(where: { issuer: { _eq: $issuer } }) {
      username
    }
  }
`
