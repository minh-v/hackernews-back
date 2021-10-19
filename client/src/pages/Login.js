import { useQuery } from "@apollo/client"
import LoginForm from "../components/LoginForm"
import { CHECK_EMAIL } from "../queries"
import { message } from "antd"

//if user presses login and already logged in, send them to profile page

const Login = () => {
  //used to get result from checking duplicate email/username
  const useImperativeQuery = (query) => {
    const { refetch } = useQuery(query, { skip: true }) //useLazyQuery

    const imperativelyCallQuery = (variables) => {
      return refetch(variables)
    }

    return imperativelyCallQuery
  }

  const checkEmail = useImperativeQuery(CHECK_EMAIL)

  const handleLogin = async (email) => {
    const { data } = await checkEmail({ email: email })
    //if email does not exist
    if (data.users.length === 0) {
      message.error("This email address is not in the system.")
      return
    }

    //login here
  }
  return (
    <div className="login-page">
      <LoginForm handleLogin={handleLogin} />
    </div>
  )
}

export default Login
