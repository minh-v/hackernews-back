import SubmitForm from "../components/SubmitForm"
import { useHistory } from "react-router-dom"
const Submit = () => {
  const history = useHistory()

  const handleSubmit = async (title, url) => {
    const res = await fetch("http://localhost:3001/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title, url }), // Send the title, url
    })
    history.push("/")
    history.go(0)
  }
  return (
    <div>
      <SubmitForm handleSubmit={handleSubmit} />
    </div>
  )
}

export default Submit
