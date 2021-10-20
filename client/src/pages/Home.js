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
    if (user) getUsername({ variables: { issuer: user?.issuer } })
  }, [user])

  // console.log("user: ", user)
  // console.log("data", data)
  if (data) {
    // console.log("username: ", data.users[0].username)
    user.username = data?.users[0].username
  }
  if (!data) return <h1>no user</h1>
  else
    return (
      <div>
        hello {user.email} {user.username}!
      </div>
    )
}

export default Home
