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

const GET_VOTE_VALUE = gql`
  query getValue($post_id: Int!, $user_issuer: String!) {
    votes(where: { _and: [{ post_id: { _eq: $post_id }, user_issuer: { _eq: $user_issuer } }] }) {
      value
      id
    }
  }
`

const DELETE_VOTE = gql`
  mutation deleteVote($id: Int!) {
    delete_votes_by_pk(id: $id) {
      id
    }
  }
`
const CREATE_COMMENT = gql`
  mutation createComment($user_issuer: String!, $post_id: Int!, $comment: String!, $parent_id: Int) {
    insert_comments(objects: { user_issuer: $user_issuer, post_id: $post_id, comment: $comment, parent_id: $parent_id }) {
      returning {
        id
        parent_id
        comment
        createdAt
        user_issuer
        post_id
      }
    }
  }
`

const CREATE_COMMENT_VOTE = gql`
  mutation comment_vote($user_issuer: String!, $comment_id: Int!, $value: Int!) {
    insert_comments_votes_one(
      object: { user_issuer: $user_issuer, comment_id: $comment_id, value: $value }
      on_conflict: { constraint: comments_votes_comment_id_user_issuer_key, update_columns: [value] }
    ) {
      id
    }
  }
`

const DELETE_COMMENT_VOTE = gql`
  mutation deleteVote($id: Int!) {
    delete_comments_votes_by_pk(id: $id) {
      id
    }
  }
`

module.exports = {
  ADD_USER,
  ADD_POST,
  CHECK_USER,
  GET_USERNAME,
  VOTE,
  GET_VOTE_VALUE,
  DELETE_VOTE,
  CREATE_COMMENT,
  DELETE_COMMENT_VOTE,
  CREATE_COMMENT_VOTE,
}
