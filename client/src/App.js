import "./App.css"
import Navbar from "./components/Navbar"
import Side from "./components/Side"
import Callback from "./pages/Callback"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Submit from "./pages/Submit"
import { Switch, Route } from "react-router-dom"
import { Layout } from "antd"
import { useUser } from "./lib/user"
const { Header, Content, Sider } = Layout

const App = () => {
  const user = useUser()
  return (
    <div className="">
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
              </Switch>
            </div>
          </Content>
          {user ? (
            <Sider theme="light">
              <Side />
            </Sider>
          ) : (
            <div></div>
          )}
        </Layout>
      </Layout>
    </div>
  )
}

export default App
