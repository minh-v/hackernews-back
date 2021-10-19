import { useState, useEffect } from "react"
import { useQuery, gql } from "@apollo/client"
import { useUser } from "../lib/user"
//display links and shit

const Home = () => {
  const [userlol, setuserlol] = useState(null)
  let user = useUser()
  const { loading, error, data } = useQuery(gql`
    query getUsername($issuer: String!) {
      users(where: { issuer: { _eq: $issuer } }) {
        username
      }
    }
  `)

  console.log("userlol", user)
  if (!user) return <div>no user</div>
  else return <div>{user.email}</div>
}

export default Home
