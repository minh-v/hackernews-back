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
  mutation AddPost($title: String!, $url: String!, $user_issuer: String!) {
    insert_posts_one(object: { title: $title, url: $url, user_issuer: $user_issuer }) {
      user_issuer
      title
      url
    }
  }
`
const DELETE_POST = gql`
  mutation deletePost($post_id: Int!) {
    delete_posts_by_pk(id: $post_id) {
      id
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
      karma
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
  mutation delete_vote($id: Int!) {
    delete_votes_by_pk(id: $id) {
      id
    }
  }
`

const GET_KARMA = gql`
  query GET_KARMA($user_issuer: String!) {
    posts(where: { user_issuer: { _eq: $user_issuer } }) {
      votes_aggregate {
        aggregate {
          sum {
            value
          }
        }
      }
    }
  }
`

const UPDATE_KARMA = gql`
  mutation set_user_karma($user_issuer: String!, $karma: Int!) {
    update_users_by_pk(pk_columns: { issuer: $user_issuer }, _set: { karma: $karma }) {
      karma
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

const DELETE_COMMENT = gql`
  mutation deleteComment($id: Int!) {
    delete_comments_by_pk(id: $id) {
      id
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
  DELETE_POST,
  CHECK_USER,
  GET_USERNAME,
  VOTE,
  GET_VOTE_VALUE,
  DELETE_VOTE,
  GET_KARMA,
  UPDATE_KARMA,
  CREATE_COMMENT,
  DELETE_COMMENT,
  DELETE_COMMENT_VOTE,
  CREATE_COMMENT_VOTE,
}
