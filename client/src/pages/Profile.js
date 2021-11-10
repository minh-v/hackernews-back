import { useUser } from "../lib/user"
import ProfilePage from "./ProfilePage"

const Profile = () => {
  const user = useUser()
  return (
    <div>
      <ProfilePage username={user.username} />
    </div>
  )
}

export default Profile
