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

export const GET_USER_DATA = gql`
  query get_user_data($username: String!) {
    users(where: { username: { _eq: $username } }) {
      createdAt
      karma
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
        issuer
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
        issuer
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
    posts(order_by: { createdAt: desc }) {
      id
      title
      url
      createdAt
      votes: votes_aggregate {
        aggregate {
          sum {
            value
          }
        }
      }
      userVotes: votes(where: { user_issuer: { _eq: $user_issuer } }) {
        value
      }
      user {
        issuer
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

export const GET_POSTS_BY_VOTE = gql`
  subscription getPostsByVote($user_issuer: String) {
    posts(order_by: { votes_aggregate: { sum: { value: desc_nulls_last } } }) {
      id
      title
      url
      createdAt
      votes: votes_aggregate {
        aggregate {
          sum {
            value
          }
        }
      }
      userVotes: votes(where: { user_issuer: { _eq: $user_issuer } }) {
        value
      }
      user {
        issuer
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
        issuer
        username
      }
      votes: votes_aggregate {
        aggregate {
          sum {
            value
          }
        }
      }
      userVotes: votes(where: { user_issuer: { _eq: $user_issuer } }) {
        value
      }
      comments(order_by: { createdAt: desc }) {
        id
        parent_id
        comment
        createdAt
        post_id
        user {
          username
        }
        userLike: comments_votes(where: { user_issuer: { _eq: $user_issuer } }) {
          value
          id
        }
        likes: comments_votes_aggregate(where: { value: { _eq: 1 } }) {
          aggregate {
            count
          }
        }
        dislikes: comments_votes_aggregate(where: { value: { _eq: -1 } }) {
          aggregate {
            count
          }
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
export const GET_POST_COMMENTS_SORTED_TOP = gql`
  subscription getPost($id: Int!, $user_issuer: String) {
    posts_by_pk(id: $id) {
      createdAt
      id
      title
      url
      user {
        issuer
        username
      }
      votes: votes_aggregate {
        aggregate {
          sum {
            value
          }
        }
      }
      userVotes: votes(where: { user_issuer: { _eq: $user_issuer } }) {
        value
      }
      comments(order_by: { comments_votes_aggregate: { sum: { value: desc } } }) {
        id
        parent_id
        comment
        createdAt
        post_id
        user {
          username
        }
        userLike: comments_votes(where: { user_issuer: { _eq: $user_issuer } }) {
          value
          id
        }
        likes: comments_votes_aggregate(where: { value: { _eq: 1 } }) {
          aggregate {
            count
          }
        }
        dislikes: comments_votes_aggregate(where: { value: { _eq: -1 } }) {
          aggregate {
            count
          }
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
export const GET_POSTS_FROM_USER = gql`
  query getPostsFromUsername($user_issuer: String, $username: String!) {
    posts(order_by: { createdAt: desc }, where: { user: { username: { _eq: $username } } }) {
      id
      title
      url
      createdAt
      votes: votes_aggregate {
        aggregate {
          sum {
            value
          }
        }
      }
      userVotes: votes(where: { user_issuer: { _eq: $user_issuer } }) {
        value
      }
      user {
        issuer
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
export const GET_USER_COMMENTS = gql`
  query getUserComments($username: String!, $user_issuer: String!) {
    comments(where: { user: { username: { _eq: $username } } }, order_by: { createdAt: desc }) {
      comment
      createdAt
      id
      parent_id
      user {
        issuer
        username
      }
      userLike: comments_votes(where: { user_issuer: { _eq: $user_issuer } }) {
        value
        id
      }
      likes: comments_votes_aggregate(where: { value: { _eq: 1 } }) {
        aggregate {
          count
        }
      }
      dislikes: comments_votes_aggregate(where: { value: { _eq: -1 } }) {
        aggregate {
          count
        }
      }
      post {
        createdAt
        id
        title
        url
        id
        title
        url
        createdAt
        votes: votes_aggregate {
          aggregate {
            sum {
              value
            }
          }
        }
        comments {
          id
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
  }
`
