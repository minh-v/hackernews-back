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
    }
  }
`

//search posts by title or url
export const SEARCH_POSTS = gql`
  query searchPosts($search: String!) {
    posts(where: { _or: [{ title: { _eq: $search } }, { url: { _eq: $search } }] }) {
      id
      title
      url
      createdAt
      user {
        username
      }
    }
  }
`
