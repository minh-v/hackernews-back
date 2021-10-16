import SignUpForm from "../components/SignupForm"
import magic from "../magic"

//send query here?

const SignUp = () => {
  const handleSignup = async (email, username) => {
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
      <SignUpForm handleSignup={handleSignup} />
    </div>
  )
}

export default SignUp
