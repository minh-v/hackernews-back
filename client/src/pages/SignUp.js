import { useState } from "react"
import SignUpForm from "../components/SignupForm"
import magic from "../magic"
import { useQuery } from "@apollo/client"
import { message } from "antd"
import { CHECK_DUPLICATE } from "../lib/queries"
import { useHistory } from "react-router"

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
    setDisabled(true)
    const { data } = await checkDuplicate({ email: email, username: username })

    //validate email and username
    if (data.users.length !== 0) {
      if (email === data.users[0].email) message.error("This email address is already being used") //red text above the top
      if (username === data.users[0].username) message.error("This username is already being used")

      return
    }

    //else
    //magic link sent to user
    //handles email validation
    const didToken = await magic.auth.loginWithMagicLink({
      email,
      redirectURI: new URL("/", window.location.origin).href, //redirect back to home page LOG THEM IN
    })

    // Validate didToken with server
    const res = await fetch("http://localhost:3001/signup", {
      method: "POST",
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
    history.go(0)
  }

  return (
    <div className="signup-page">
      <SignUpForm handleSignup={handleSignup} disabled={disabled} />
    </div>
  )
}

export default SignUp
