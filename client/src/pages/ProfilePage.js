import { Link } from "react-router-dom"

const ProfilePage = (props) => {
  console.log(props.location.search.split("=")[1])
  const username = props.location.search.split("=")[1]
  return (
    <div>
      user: {username}
      <span>
        <br></br>
        about: <Link to={`/submitted?id=${username}`}>submissions</Link>, <Link to={`/comments?id=${username}`}>comments</Link>
      </span>
    </div>
  )
}

export default ProfilePage
