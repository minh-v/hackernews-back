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

export const GET_ALL_POSTS = gql`
  query getPosts {
    posts {
      id
      title
      url
      user {
        username
      }
      createdAt
      votes {
        id
        value
      }
    }
  }
`

//search posts by title or url
export const SEARCH_POSTS = gql`
  subscription searchPosts($search: String!, $user_issuer: String) {
    posts(where: { _or: [{ title: { _ilike: $search } }, { url: { _regex: $search } }] }) {
      id
      title
      url
      createdAt
      user {
        username
      }
      votes {
        id
        value
      }
      userVotes: votes(where: { user_issuer: { _eq: $user_issuer } }) {
        value
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export const POSTS_SUBSCRIPTION = gql`
  subscription refreshPosts($user_issuer: String) {
    posts {
      id
      title
      url
      createdAt
      votes {
        id
        value
      }
      userVotes: votes(where: { user_issuer: { _eq: $user_issuer } }) {
        value
      }
      user {
        username
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export const GET_POST = gql`
  subscription getPost($id: Int!, $user_issuer: String) {
    posts_by_pk(id: $id) {
      createdAt
      id
      title
      url
      user {
        username
      }
      votes {
        id
        value
      }
      userVotes: votes(where: { user_issuer: { _eq: $user_issuer } }) {
        value
      }
      comments(order_by: { createdAt: desc }) {
        id
        parent_id
        comment
        createdAt
        user {
          username
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`
