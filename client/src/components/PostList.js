import { GET_ALL_POSTS } from "../lib/queries"
import { useQuery } from "@apollo/client"
import Post from "./Post"
//query all posts
const PostList = () => {
  const { data, error, loading } = useQuery(GET_ALL_POSTS)

  if (loading) return <div>loading...</div>
  console.log(data)
  return (
    <div>
      {data.posts.map((post) => {
        return <Post key={post.id} post={post} />
      })}
    </div>
  )
}

export default PostList
