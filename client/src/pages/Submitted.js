//postlist of posts the user submitted given username as parameter
import { GET_POSTS_FROM_USER } from "../lib/queries"
import { useUser } from "../lib/user"
import { useQuery } from "@apollo/client"
import PostList from "../components/PostList"

const Submitted = (props) => {
  const user = useUser()

  console.log(props.location.search.split("=")[1])
  const username = props.location.search.split("=")[1]

  const { data, loading } = useQuery(GET_POSTS_FROM_USER, {
    variables: {
      username: username,
      user_issuer: user?.issuer || "",
    },
  })

  if (loading) return <div>loading..</div>
  return (
    <div>
      <h1>{username}'s submissions </h1>
      <PostList posts={data.posts} />
    </div>
  )
}

export default Submitted
