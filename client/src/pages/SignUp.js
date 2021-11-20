import { useState } from "react"
import SignUpForm from "../components/SignupForm"
import magic from "../magic"
import { useQuery } from "@apollo/client"
import { message } from "antd"
import { CHECK_DUPLICATE } from "../lib/queries"
import { useHistory } from "react-router"
import { REACT_APP_API_URL } from "../lib/constants"

//send query here?

const SignUp = () => {
  const history = useHistory()
  const [disabled, setDisabled] = useState(false)

  //used to get result from checking duplicate email/username
  const useImperativeQuery = (query) => {
    const { refetch } = useQuery(query, { skip: true }) //useLazyQuery

    const imperativelyCallQuery = (variables) => {
      return refetch(variables)
    }

    return imperativelyCallQuery
  }

  const checkDuplicate = useImperativeQuery(CHECK_DUPLICATE)

  const handleSignup = async (email, username) => {
    //check email
    setDisabled(true) //disable email button so user can't submit multiple times
    const { data } = await checkDuplicate({ email: email, username: username })

    //validate email and username

    if (data.users.length !== 0) {
      if (email === data.users[0].email) message.error("This email address is already being used") //red text above the top
      if (username === data.users[0].username) message.error("This username is already being used")
      setDisabled(false)
      return
    }

    //else
    //magic link sent to user
    //handles email validation
    const didToken = await magic.auth.loginWithMagicLink({
      email,
    })

    // Validate didToken with server
    const res = await fetch(`${REACT_APP_API_URL}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken,
      },
      body: JSON.stringify({ username }), // Send the username
    })
    if (res.status === 200) {
      console.log("sign up successful")
    }
    setDisabled(false)
    history.push("/")
  }

  return (
    <div className="signup-page">
      <SignUpForm handleSignup={handleSignup} disabled={disabled} />
    </div>
  )
}

export default SignUp
