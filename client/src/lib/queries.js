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
export const GET_POSTS_FROM_USERNAME = gql`
  query get_posts_from_username($user_issuer: String, $username: String!, $limit: Int, $offset: Int) {
    posts(order_by: { createdAt: desc }, limit: $limit, offset: $offset, where: { user: { username: { _eq: $username } } }) {
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
export const GET_COMMENTS_FROM_USERNAME = gql`
  query get_comments_from_username($username: String!, $user_issuer: String!, $limit: Int, $offset: Int) {
    comments(where: { user: { username: { _eq: $username } } }, order_by: { createdAt: desc }, limit: $limit, offset: $offset) {
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

export const SUBSCRIBE_POSTS = gql`
  subscription subscribe_posts($user_issuer: String, $order: posts_order_by!, $limit: Int, $offset: Int, $search: String!) {
    posts(
      order_by: [$order]
      limit: $limit
      offset: $offset
      where: { _or: [{ title: { _iregex: $search } }, { url: { _iregex: $search } }] }
    ) {
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
export const SEARCH_POSTS_SORTED_NEW = gql`
  query search_posts_sorted_new($user_issuer: String, $limit: Int, $offset: Int, $search: String!) {
    posts(
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
      where: { _or: [{ title: { _iregex: $search } }, { url: { _iregex: $search } }] }
    ) {
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

export const SEARCH_POSTS_SORTED_TOP = gql`
  query search_posts_sorted_top($user_issuer: String, $limit: Int, $offset: Int, $search: String!) {
    posts(
      order_by: { votes_aggregate: { sum: { value: desc } } }
      limit: $limit
      offset: $offset
      where: { _or: [{ title: { _iregex: $search } }, { url: { _iregex: $search } }] }
    ) {
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
