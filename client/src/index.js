import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client"
import { BrowserRouter } from "react-router-dom"
import { WebSocketLink } from "@apollo/client/link/ws"

const wsLink = new WebSocketLink({
  uri: "ws://localhost:8080/v1/graphql",
  credentials: "include",
  options: {
    reconnect: true,
  },
})

const link = createHttpLink({
  uri: "http://localhost:8080/v1/graphql",
  credentials: "include",
})

const client = new ApolloClient({
  uri: "http://localhost:8080/v1/graphql",
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
