import { useUser } from "../lib/user"

const Profile = () => {
  const user = useUser()
  return (
    <div>
      hello {user?.email} {user?.username} {user?.issuer}!
    </div>
  )
}

export default Profile
