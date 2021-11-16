import React from "react"
import { Link } from "react-router-dom"
import { useUser } from "../lib/user"
import { useHistory } from "react-router-dom"
import magic from "../magic"
import { PageHeader, Button, Tooltip } from "antd"
import { PlusOutlined } from "@ant-design/icons"

const Navbar = () => {
  let user = useUser()
  const history = useHistory()

  const logout = async () => {
    await fetch("http://localhost:3001/logout", {
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
            <Link to="/top/1">
              <div className="top-title">Top</div>
            </Link>
            <Link to="/new/1">
              <div className="top-title">New</div>
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
              <div className="right-nav">
                <Link to="/submit">
                  <Tooltip title="Create Post">
                    <Button className="right-nav-item">
                      <PlusOutlined />
                    </Button>
                  </Tooltip>
                </Link>
                <Link to={`/user?id=${user.username}`} key={`${user.username}`}>
                  <Button key="2" className="right-nav-item">
                    {user.username} ({user.karma})
                  </Button>
                </Link>
                <Button key="1" type="danger" onClick={logout} key="logout" className="right-nav-item">
                  Log out
                </Button>
              </div>,
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
