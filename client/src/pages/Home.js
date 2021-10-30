import { useUser } from "../lib/user"
import PostList from "../components/PostList"
import magic from "../magic"
import { GET_ALL_POSTS } from "../lib/queries"
import { useQuery } from "@apollo/client"
//display links and shit

const Home = () => {
  let user = useUser()
  // const temp = async () => {
  //   const isLoggedIn = await magic.user.isLoggedIn()
  //   console.log(isLoggedIn)
  // }
  // temp()
  const { data, error, loading } = useQuery(GET_ALL_POSTS)

  if (loading) return <div>loading...</div>
  return (
    <div>
      <PostList posts={data.posts} />
    </div>
  )
}

export default Home
