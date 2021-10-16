import React, { useState } from "react"

const SignupForm = ({ handleSignup }) => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    handleSignup(email, username)
  }

  return (
    <div>
      <h3>sign up</h3>
      <form onSubmit={handleSubmit}>
        email
        <input value={email} onChange={(event) => setEmail(event.target.value)} />
        username
        <input value={username} onChange={(event) => setUsername(event.target.value)} />
        <button type="submit">sign up</button>
      </form>
    </div>
  )
}

export default SignupForm
