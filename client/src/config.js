const config = {
  MAGIC_API_KEY: "pk_live_35FBE7FE41B75731",
  api: process.env.REACT_APP_DEBUG === "production" ? "http://hackernews-back.site/:3001" : "http://localhost:3001",
  hasura_endpoint:
    process.env.REACT_APP_DEBUG === "production" ? "hackernews-back.site:8080/v1/graphql" : "localhost:8080/v1/graphql",
}

export default config
