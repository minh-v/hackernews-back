import { useState, useEffect } from "react"
import { useQuery, useLazyQuery, gql } from "@apollo/client"
import { useUser } from "../lib/user"
//display links and shit

const Home = () => {
  let user = useUser()

  console.log("home user:", user)
  if (!user) return <h1>no user</h1>
  else
    return (
      <div>
        hello {user?.email} {user?.username}!
      </div>
    )
}

export default Home
