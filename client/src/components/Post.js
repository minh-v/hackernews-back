import { timeDifferenceForDate } from "../utils/timeDifference"

const Post = ({ post }) => {
  console.log(post)
  return (
    <div>
      {post.title} {post.url} {post.user_issuer} {timeDifferenceForDate(post.createdAt)}
    </div>
  )
}

export default Post
