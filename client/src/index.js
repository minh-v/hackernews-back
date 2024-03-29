import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { BrowserRouter } from "react-router-dom"
import { WebSocketLink } from "@apollo/client/link/ws"
import config from "./config"

console.log("REACT_APP_DEBUG: ", process.env.REACT_APP_DEBUG)
console.log("REACT_APP_API: ", process.env.REACT_APP_API_URL)
console.log("HASURA_ENDPOINT", process.env.REACT_APP_HASURA_ENDPOINT)

//"ws://localhost:8080/v1/graphql"
const wsLink = new WebSocketLink({
  uri: `ws://${config.hasura_endpoint}`,
  credentials: "include",
  options: {
    reconnect: true,
  },
})

//"http://localhost:8080/v1/graphql"
const client = new ApolloClient({
  uri: `http://${config.hasura_endpoint}`,
  cache: new InMemoryCache(),
  link: wsLink,
  // wsLink,
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
)
