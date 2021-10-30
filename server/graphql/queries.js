const { gql } = require("graphql-request")

const ADD_USER = gql`
  mutation AddUser($email: String!, $issuer: String!, $publicAddress: String!, $username: String!) {
    insert_users_one(object: { email: $email, issuer: $issuer, publicAddress: $publicAddress, username: $username }) {
      email
      username
    }
  }
`

const ADD_POST = gql`
  mutation AddPost($title: String!, $url: String!, $user_issuer: String!, $createdAt: String) {
    insert_posts_one(object: { title: $title, url: $url, user_issuer: $user_issuer, createdAt: $createdAt }) {
      user_issuer
      title
      url
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

// const VOTE = gql`
//   mutation upvote($user_issuer: String!, $post_id: Int!, $value: Int!) {
//     insert_votes(objects: { user_issuer: $user_issuer, post_id: $post_id, value: $value }) {
//       returning {
//         id
//       }
//     }
//   }
// `

const VOTE = gql`
  mutation upvote($user_issuer: String!, $post_id: Int!, $value: Int!) {
    insert_votes(
      objects: [{ user_issuer: $user_issuer, post_id: $post_id, value: $value }]
      on_conflict: { constraint: votes_post_id_user_issuer_key, update_columns: [value] }
    ) {
      returning {
        id
      }
    }
  }
`

module.exports = { ADD_USER, ADD_POST, CHECK_USER, GET_USERNAME, VOTE }
