import magic from "../magic"
import { useHistory } from "react-router-dom"

const Callback = () => {
  const authenticateWithServer = async (didToken) => {
    let res = await fetch("http://localhost:3001/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken,
      },
    })
    history.push("/")
  }

  const history = useHistory()
  magic.auth.loginWithCredential().then((didToken) => authenticateWithServer(didToken))
  console.log("push")
  //close window
  window.close()
  //history.go("/")

  return <div>loading..</div>
}

export default Callback
