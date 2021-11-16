import { Link } from "react-router-dom"
import { useUser } from "../lib/user"
import { useHistory } from "react-router-dom"
import { useLocation } from "react-router"
import magic from "../magic"
import { Menu } from "antd"
import { PlusOutlined, MenuOutlined } from "@ant-design/icons"
import { Tooltip } from "antd"
import { useMediaQuery } from "react-responsive"
const { SubMenu } = Menu

const Nav = () => {
  let user = useUser()
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location

  const minBreakpoint = useMediaQuery({ query: "(max-width: 650px" }) //breakpoint where left and right menus touch

  const logout = async () => {
    await fetch("http://localhost:3001/logout", {
      credentials: "include",
    })

    await magic.user.logout()

    //refresh page
    history.go(0)
    history.push("/")
  }
  return (
    <div className="header-nav">
      <div clasName="header-start">
        <div className="title">
          <Menu theme="dark" mode="horizontal" disabledOverflow={true} selectedKeys={[pathname.split("/")[1]]}>
            <Menu.Item key="home">
              <Link to="/" key="home">
                Home
              </Link>
            </Menu.Item>
            <Menu.Item key="top">
              <Link to="/top/1" key="top">
                Top
              </Link>
            </Menu.Item>
            <Menu.Item key="new">
              <Link to="/new/1" key="new">
                New
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
      {user?.loading ? (
        <div></div>
      ) : user?.issuer ? (
        <div className="nav-menu">
          {!minBreakpoint && (
            <Menu theme="dark" mode="horizontal" disableOverflow={true} selectedKeys={[pathname.split("/")[1]]}>
              <Tooltip title="Create Post">
                <Menu.Item key="submit">
                  <Link to="/submit">
                    <PlusOutlined style={{ fontSize: "24px" }} />
                  </Link>
                </Menu.Item>
              </Tooltip>
              <Menu.Item key="user">
                <Link to={`/user?id=${user.username}`} key="profile">
                  {user.username} ({user.karma})
                </Link>
              </Menu.Item>
              <Menu.Item key="logout" onClick={logout}>
                <div>Log out</div>
              </Menu.Item>
            </Menu>
          )}
          {minBreakpoint && (
            <Menu theme="dark" mode="horizontal" selectedKeys={[pathname.split("/")[1]]} triggerSubMenuAction="click">
              <SubMenu key="SubMenu" icon={<MenuOutlined style={{ fontSize: "20px" }} />}>
                <Tooltip title="Create Post">
                  <Menu.Item key="submit">
                    <Link to="/submit">
                      <PlusOutlined style={{ fontSize: "24px" }} />
                    </Link>
                  </Menu.Item>
                </Tooltip>
                <Menu.Item key="user">
                  <Link to={`/user?id=${user.username}`} key="profile">
                    {user.username} ({user.karma})
                  </Link>
                </Menu.Item>
                <Menu.Item key="logout" onClick={logout}>
                  <div>Log out</div>
                </Menu.Item>
              </SubMenu>
            </Menu>
          )}
        </div>
      ) : (
        <div className="nav-menu">
          <Menu theme="dark" mode="horizontal" disabledOverflow={true} selectedKeys={[pathname.split("/")[1]]}>
            <Menu.Item key="login">
              <Link to="/login" key="login">
                Login
              </Link>
            </Menu.Item>
            <Menu.Item key="signup">
              <Link to="/signup" key="signup">
                Signup
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      )}
    </div>
  )
}

export default Nav
