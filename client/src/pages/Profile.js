import { useUser } from "../lib/user"
const Profile = () => {
  const user = useUser()
  return (
    <div>
      hello {user?.email} {user?.username}!
    </div>
  )
}

export default Profile
