import React from "react"
import { Link } from "react-router-dom"
import { PageHeader, Button, Menu } from "antd"
import { useUser } from "../lib/user"

const Navbar = () => {
  let user = useUser()
  //refresh user here

  const logout = async () => {
    const res = await fetch("http://localhost:3001/logout", {
      credentials: "include",
    })
    console.log(res)
  }

  //if user, profile logout buttons instead
  return (
    <div className="navbar">
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
              <Link to="/profile">
                <Button key="2">Profile</Button>
              </Link>,
              <Button key="1" type="danger" onClick={logout}>
                Log out
              </Button>,
            ]
          ) : (
            //if no user
            [
              <Link to="/login">
                <Button key="2">Login</Button>
              </Link>,
              <Link to="/signup">
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
