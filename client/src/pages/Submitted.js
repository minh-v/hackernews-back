//postlist of posts the user submitted given username as parameter
import { GET_POSTS_FROM_USERNAME } from "../lib/queries"
import { useUser } from "../lib/user"
import { useQuery } from "@apollo/client"
import PostList from "../components/PostList"
import { LINKS_PER_PAGE } from "../lib/constants"

const Submitted = (props) => {
  const user = useUser()
  const pieces = props.location.pathname.split("/")
  console.log(pieces)
  const page = pieces[pieces.length - 1]
  const username = pieces[pieces.length - 2]

  const offset = (page - 1) * LINKS_PER_PAGE
  const limit = LINKS_PER_PAGE

  const { data, loading } = useQuery(GET_POSTS_FROM_USERNAME, {
    variables: {
      username: username,
      user_issuer: user?.issuer || "",
      offset: offset,
      limit: limit,
    },
  })

  if (loading) return <div>loading..</div>
  return (
    <div>
      <h1>{username}'s submissions </h1>
      <PostList posts={data.posts} pageIndex={offset} />
    </div>
  )
}

export default Submitted
