import { useUser } from "../lib/user"
import PostList from "../components/PostList"
import { POSTS_SUBSCRIPTION } from "../lib/queries"
import { useSubscription } from "@apollo/client"

const Home = () => {
  let user = useUser()

  const { data, loading } = useSubscription(POSTS_SUBSCRIPTION, { variables: { user_issuer: user ? user?.issuer : "" } })

  console.log(data)

  if (loading || !data) return <div>loading...</div>
  return (
    <div>
      <PostList posts={data.posts} />
    </div>
  )
}

export default Home
