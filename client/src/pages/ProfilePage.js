import { Link } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_USER_DATA } from "../lib/queries"

const ProfilePage = (props) => {
  const username = props.location.search.split("=")[1]
  const { data, loading } = useQuery(GET_USER_DATA, {
    variables: {
      username: username,
    },
  })

  if (loading) return <div>loading..</div>

  const date = new Date(data.users[0].createdAt)

  return (
    <div>
      user: {username}
      <br></br>
      created: {date.toDateString()}
      <br></br>
      karma: {data.users[0].karma}
      <span>
        <br></br>
        about: <Link to={`/submitted?id=${username}`}>submissions</Link>, <Link to={`/comments?id=${username}`}>comments</Link>
      </span>
    </div>
  )
}

export default ProfilePage
