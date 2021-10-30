import { useUser } from "../lib/user"
import PostList from "../components/PostList"
import magic from "../magic"
//display links and shit

const Home = () => {
  let user = useUser()
  const temp = async () => {
    const isLoggedIn = await magic.user.isLoggedIn()
    console.log(isLoggedIn)
  }
  temp()
  // console.log("home user:", user)
  // if (!user) return <h1>no user</h1>
  // else
  return (
    <div>
      <PostList />
    </div>
  )
}

export default Home
