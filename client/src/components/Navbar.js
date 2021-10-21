import React, { useState } from "react"
import { Link } from "react-router-dom"
import { PageHeader, Button } from "antd"
import { useUser } from "../lib/user"
import { useHistory } from "react-router-dom"

const Navbar = () => {
  let user = useUser()
  const history = useHistory()
  const [refresh, setRefresh] = useState(null)
  //refresh user here

  const logout = async () => {
    const res = await fetch("http://localhost:3001/logout", {
      credentials: "include",
    })

    //refresh page
    history.go(0)
  }

  //if user, profile logout buttons instead
  return (
    <div className="navbar" key={refresh}>
      <PageHeader
        title={
          <Link to="/">
            <div className="header-title">Home</div>
          </Link>
        }
        extra={
          // while loading don't display anything
          user?.loading ? (
            <div></div>
          ) : //if user is logged in (has issuer)
          user?.issuer ? (
            [
              <Link to="/profile" key="profile">
                <Button key="2">Profile</Button>
              </Link>,
              <Button key="1" type="danger" onClick={logout} key="logout">
                Log out
              </Button>,
            ]
          ) : (
            //if no user
            [
              <Link to="/login" key="login">
                <Button key="2">Login</Button>
              </Link>,
              <Link to="/signup" key="signup">
                <Button key="1" type="primary">
                  Sign up
                </Button>
              </Link>,
            ]
          )
        }
      ></PageHeader>
    </div>
  )
}

export default Navbar
