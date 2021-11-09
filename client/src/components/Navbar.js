import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useUser } from "../lib/user"
import { useHistory } from "react-router-dom"
import magic from "../magic"
import { PageHeader, Button } from "antd"

const Navbar = () => {
  let user = useUser()
  const history = useHistory()

  const logout = async () => {
    const res = await fetch("http://localhost:3001/logout", {
      credentials: "include",
    })

    await magic.user.logout()

    //refresh page
    history.go(0)
    history.push("/")
  }

  //if user, profile logout buttons instead
  return (
    <div className="navbar">
      <PageHeader
        title={
          <div className="title">
            <Link to="/">
              <div className="header-title">Home</div>
            </Link>
            <Link to="/top">
              <div className="top-title">Top</div>
            </Link>
          </div>
        }
        extra={
          // while loading don't display anything
          user?.loading ? (
            <div></div>
          ) : //if user is logged in (has issuer)
          user?.issuer ? (
            [
              <Link to="/submit">
                <Button>Submit</Button>
              </Link>,
              <Link to="/profile" key="profile">
                <Button key="2">{user.username}</Button>
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
