const { gql } = require("graphql-request")

const ADD_USER = gql`
  mutation AddUser($email: String!, $issuer: String!, $publicAddress: String!, $username: String!) {
    insert_users_one(object: { email: $email, issuer: $issuer, publicAddress: $publicAddress, username: $username }) {
      email
      username
    }
  }
`

const CHECK_USER = gql`
  query checkUser($issuer: String!) {
    users(where: { issuer: { _eq: $issuer } }) {
      email
    }
  }
`

const GET_USERNAME = gql`
  query getUsername($issuer: String!) {
    users(where: { issuer: { _eq: $issuer } }) {
      username
    }
  }
`
module.exports = { ADD_USER, CHECK_USER, GET_USERNAME }
