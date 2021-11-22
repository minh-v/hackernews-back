const config = {
  MAGIC_API_KEY: "pk_live_35FBE7FE41B75731",
  api: process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_URL : "http://localhost:3001",
  hasura_endpoint: process.env.NODE_ENV === "production" ? process.env.REACT_APP_HASURA_ENDPOINT : "localhost:8080/v1/graphql",
}

export default config
