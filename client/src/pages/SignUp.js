import { useState } from "react"
import SignUpForm from "../components/SignupForm"
import magic from "../magic"
import { useQuery, useLazyQuery, gql } from "@apollo/client"
import { message } from "antd"

//send query here?

const SignUp = () => {
  const [disabled, setDisabled] = useState(false)

  const CHECK_DUPLICATE = gql`
    query checkDuplicate($email: String!, $username: String!) {
      users(where: { _or: [{ username: { _eq: $username } }, { email: { _eq: $email } }] }) {
        email
        username
      }
    }
  `

  //used to get result from checking duplicate email/username
  const useImperativeQuery = (query) => {
    const { refetch } = useQuery(query, { skip: true })

    const imperativelyCallQuery = (variables) => {
      return refetch(variables)
    }

    return imperativelyCallQuery
  }

  const checkDuplicate = useImperativeQuery(CHECK_DUPLICATE)

  const handleSignup = async (email, username) => {
    //check email
    const { data } = await checkDuplicate({ email: email, username: username }) //JWT authentication mode no auth header

    //validate email and username
    if (data.users.length !== 0) {
      if (email === data.users[0].email) message.error("This email address is already being used") //red text above the top
      if (username === data.users[0].username) message.error("This username is already being used")

      return
    }

    //else
    //magic link sent to user
    const didToken = await magic.auth.loginWithMagicLink({ email })

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
  }

  return (
    <div>
      <SignUpForm handleSignup={handleSignup} disabled={disabled} />
    </div>
  )
}

export default SignUp
