import "./App.css"
import Nav from "./components/Nav"
import { Row, Col } from "antd"
import Side from "./components/Side"
import Callback from "./pages/Callback"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Search from "./pages/Search"
import Submit from "./pages/Submit"
import PostPage from "./pages/PostPage"
import ProfilePage from "./pages/ProfilePage"
import Submitted from "./pages/Submitted"
import Comments from "./pages/Comments"
import Top from "./pages/Top"
import { Switch, Route, useLocation, Redirect } from "react-router-dom"
import { Layout } from "antd"
import { useEffect, useState } from "react"
import New from "./pages/New"
import { useMediaQuery } from "react-responsive"

// import { useUser } from "./lib/user"
const { Header, Content, Sider } = Layout

const App = () => {
  const [showSider, setShowSider] = useState(true)
  const location = useLocation()
  let currentPath = ""
  useEffect(() => {
    const { pathname } = location
    currentPath = pathname.split("/")[1]
    if (currentPath === "signup" || currentPath === "login" || currentPath === "search") {
      setShowSider(false)
    } else {
      setShowSider(true)
    }
    console.log(showSider)
  }, [location])

  const minBreakpoint = useMediaQuery({ query: "(max-width: 768px" })

  return (
    <div className="app">
      <Layout className="app-layout">
        <Row>
          <Col span={24}>
            <Header className="header">
              <Nav />
            </Header>
          </Col>
        </Row>
        <Row>
          <Layout className="content-layout">
            <Col xs={24} md={18}>
              <Content className="content">
                <div className="content-div">
                  {!minBreakpoint && <div className="spacer"></div>}
                  <Switch>
                    <Route exact path="/" forceRefresh={true} render={() => <Redirect to="/new/1" />} />
                    <Route exact path="/new/:page" component={New} />
                    <Route exact path="/top/:page" component={Top} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/callback" component={Callback} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/submit" component={Submit} />
                    <Route exact path="/search" component={Search} />
                    <Route exact path="/submitted" component={Submitted} />
                    <Route exact path="/comments" component={Comments} />
                    <Route exact path="/post" component={PostPage} />
                    <Route exact path="/user" component={ProfilePage} />
                  </Switch>
                </div>
              </Content>
            </Col>
            {showSider && (
              <Col xs={0} md={6}>
                <Sider
                  className="sider"
                  onBreakpoint={(broken) => {
                    console.log("broken")
                  }}
                  width="100%"
                >
                  <Side />
                </Sider>
              </Col>
            )}
          </Layout>
        </Row>
      </Layout>
    </div>
  )
}

export default App
