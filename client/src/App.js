import "./App.css"
import Navbar from "./components/Navbar"
import Callback from "./pages/Callback"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
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
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/callback" component={Callback} />
            </Switch>
          </div>
        </Content>
      </Layout>
    </div>
  )
}

export default App
