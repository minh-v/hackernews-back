import "./App.css"
import Navbar from "./components/Navbar"
import Callback from "./pages/Callback"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import { Switch, Route } from "react-router-dom"
import { Layout } from "antd"

const App = () => {
  const { Header, Content } = Layout
  return (
    <div className="app">
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <Content>
          <div className="content">
            <Switch>
              <Route exact path="/" forceRefresh={true} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/callback" component={Callback} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </div>
        </Content>
      </Layout>
    </div>
  )
}

export default App
