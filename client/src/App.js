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
import { useEffect } from "react"
import New from "./pages/New"

// import { useUser } from "./lib/user"
const { Header, Content, Sider } = Layout

const App = () => {
  const location = useLocation()
  useEffect(() => {
    const currentPath = location.pathname
    console.log("if currentPath = search, remove sidebar eventually")
  }, [location])

  return (
    <div className="app">
      <Layout>
        <Header className="header">
          <Nav />
        </Header>
        <Layout className="content-layout">
          <Content className="content">
            <div className="content-div">
              <div className="spacer"></div>
              <Switch>
                {/* <Route exact path="/" forceRefresh={true} component={Home} /> */}
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
          <Sider
            className="sider"
            width="350"
            onBreakpoint={(broken) => {
              console.log(broken)
            }}
          >
            <Side />
          </Sider>
        </Layout>
      </Layout>
    </div>
  )
}

export default App
