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
  query searchPosts($search: String!, $user_issuer: String) {
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
    }
  }
`

export const POSTS_SUBSCRIPTION = gql`
  subscription refreshPosts($user_issuer: String) {
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
      userVotes: votes(where: { user_issuer: { _eq: $user_issuer } }) {
        value
      }
    }
  }
`

/*
      votesuserid (user id) {
        value
      }
      for each post, query votes table, passing in user id as paramater to filter
      return the value of the vote, else return 0/null
      in post component, check this value to determine to color the vote button
*/
