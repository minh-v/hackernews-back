// import { timeDifferenceForDate } from "../utils/timeDifference"
// import { useQuery } from "@apollo/client"
// import { GET_USERNAME } from "../lib/queries"

// const Post = ({ post }) => {
//   console.log(post)
//   const [getUsername, { data: username }] = useQuery(GET_USERNAME, { variables: { issuer: post.user_issuer } })
//   //query username here?
//   return (
//     <div>
//       title: {post.title} url: {post.url} posted by {getUsername({ issuer: post.user_issuer })} posted{" "}
//       {timeDifferenceForDate(post.createdAt)}
//     </div>
//   )
// }

// export default Post

import { timeDifferenceForDate } from "../utils/timeDifference"
import { useQuery } from "@apollo/client"
import { GET_USERNAME } from "../lib/queries"

const Post = ({ post }) => {
  console.log(post)
  //query username here?
  return (
    <div>
      title: {post.title} url: {post.url} posted by {post.user_issuer} posted
      {timeDifferenceForDate(post.createdAt)}
    </div>
  )
}

export default Post
