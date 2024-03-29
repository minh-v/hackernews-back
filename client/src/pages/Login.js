import { useQuery } from "@apollo/client"
import { useHistory } from "react-router-dom"
import LoginForm from "../components/LoginForm"
import { CHECK_EMAIL } from "../lib/queries"
import magic from "../magic"
import { message } from "antd"
import config from "../config"

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

  const history = useHistory()
  const checkEmail = useImperativeQuery(CHECK_EMAIL)

  const handleLogin = async (email) => {
    const { data } = await checkEmail({ email: email })
    //if email does not exist
    if (data.users.length === 0) {
      message.error("This email address is not in the system.")
      return
    }

    //login here
    //magic link sent to user
    //handles email validation
    const didToken = await magic.auth.loginWithMagicLink({
      email,
    })
    // Validate didToken with server
    const res = await fetch(`${config.api}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken,
      },
    })

    if (res.status === 200) {
      console.log("login successful")
    }
    history.push("/")
    history.go(0)
  }
  return (
    <div className="login-page">
      <LoginForm handleLogin={handleLogin} />
    </div>
  )
}

export default Login
