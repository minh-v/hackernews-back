import React from "react"
import { Link } from "react-router-dom"
import { PageHeader, Button } from "antd"
import { useUser } from "../lib/user"

const Navbar = () => {
  let user = useUser()
  //refresh user here
  //depending on user, sign up/login, display home etc
  return (
    <div className="navbar">
      <PageHeader
        title="Site"
        extra={[
          <Link to="/login">
            <Button key="2">Login</Button>
          </Link>,
          <Link to="/signup">
            <Button key="1" type="primary">
              Sign up
            </Button>
          </Link>,
        ]}
      ></PageHeader>
    </div>
  )
}

export default Navbar
