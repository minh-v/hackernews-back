import SubmitForm from "../components/SubmitForm"
import { useHistory } from "react-router-dom"
import { API_URL } from "../lib/constants"
const Submit = () => {
  const history = useHistory()

  const handleSubmit = async (title, url) => {
    await fetch(`${API_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title, url }), // Send the title, url
    })
    console.log("submittd")
    history.push("/") //send to home screen
    // history.go(0)
  }
  return (
    <div className="submit-page">
      <SubmitForm handleSubmit={handleSubmit} />
    </div>
  )
}

export default Submit
