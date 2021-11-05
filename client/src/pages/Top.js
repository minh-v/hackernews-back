import { useUser } from "../lib/user"
import PostList from "../components/PostList"
import { GET_POSTS_BY_VOTE } from "../lib/queries"
import { useSubscription } from "@apollo/client"

const Top = () => {
  let user = useUser()

  const { data, loading } = useSubscription(GET_POSTS_BY_VOTE, { variables: { user_issuer: user ? user?.issuer : "" } })

  if (loading || !data) return <div>loading...</div>
  return (
    <div>
      <PostList posts={data.posts} />
    </div>
  )
}

export default Top
