import { useState, useEffect } from "react"
import { useQuery, useLazyQuery, gql } from "@apollo/client"
import { useUser } from "../lib/user"
//display links and shit

const Home = () => {
  let user = useUser()
  const [getUsername, { loading, error, data }] = useLazyQuery(
    gql`
      query getUsername($issuer: String!) {
        users(where: { issuer: { _eq: $issuer } }) {
          username
        }
      }
    `
  )

  useEffect(() => {
    getUsername({ variables: { issuer: user.issuer } })
    if (data) {
      console.log("username: ", data.users[0].username)
      user.username = data.users[0].username
    }
  }, [user])

  console.log("user: ", user)
  console.log("data", data)
  if (!user) return <div>no user</div>
  else return <div>hello {user.email}!</div>
}

export default Home
