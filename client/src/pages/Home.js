import { useUser } from "../lib/user"
import PostList from "../components/PostList"
import magic from "../magic"
import { POSTS_SUBSCRIPTION } from "../lib/queries"
import { useSubscription } from "@apollo/client"
//display links and shit

const Home = () => {
  let user = useUser()
  // const temp = async () => {
  //   const isLoggedIn = await magic.user.isLoggedIn()
  //   console.log(isLoggedIn)
  // }
  // temp()
  // const { data, loading } = useQuery(GET_ALL_POSTS)
  console.log(user)
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
