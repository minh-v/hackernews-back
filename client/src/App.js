import "./App.css"
import Navbar from "./components/Navbar"
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
import { Switch, Route, useLocation } from "react-router-dom"
import { Layout } from "antd"
import { useEffect } from "react"

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
          <Navbar />
        </Header>
        <Layout>
          <Content>
            <div className="content">
              <Switch>
                <Route exact path="/" forceRefresh={true} component={Home} />
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
                <Route exact path="/top" component={Top} />
              </Switch>
            </div>
          </Content>
          <Sider theme="light">
            <Side />
          </Sider>
        </Layout>
      </Layout>
    </div>
  )
}

export default App
