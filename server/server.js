const express = require("express")
const jwt = require("jsonwebtoken")
const magic = require("./magic")
const cors = require("cors")
const { request, gql, GraphQLClient } = require("graphql-request")

const app = express()
app.use(cors())
app.use(express.json())

const client = new GraphQLClient("http://graphql-engine:8080/v1/graphql")

app.get("/", (req, res) => {
  res.send("<h1>hasdssdasdas</h1>")
})

app.post("/signup", async (req, res) => {
  try {
    const didToken = req.headers.authorization.substr(7)
    const username = req.body.username

    await magic.token.validate(didToken)
    const metadata = await magic.users.getMetadataByToken(didToken)

    // Create JWT
    let token = jwt.sign(
      {
        ...metadata,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": `${metadata.issuer}`,
        },
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      },
      process.env.JWT_SECRET
    )

    const { issuer, publicAddress, email } = metadata

    // let query = {
    //   query: `mutation {
    //       insert_users_one(object:
    //         {
    //           email: "${email}",
    //           issuer: "${issuer}",
    //           publicAddress: "${publicAddress}",
    //           username: "${username}"
    //         })
    //         {
    //         email
    //         username
    //       }
    //     }`,
    // }

    // let res = await fetch("http://graphql-engine:8080/v1/graphql", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization: "Bearer " + token,
    //   },
    //   body: JSON.stringify(query),
    // })

    const mutation = gql`
      mutation AddUser($email: String!, $issuer: String!, publicAddress: String!, username: String!) {
        insert_users_one(object: 
          { 
            email: "${email}", 
            issuer: "${issuer}", 
            publicAddress: "${publicAddress}", 
            username: "${username}" 
          })
          {
          email
          username
        }
      }`

    const variables = {
      email: email,
      issuer: issuer,
      publicAddress: publicAddress,
      username: username,
    }

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    }
    const data = await client.request(mutation, variables, headers)

    console.log("data", data)
    return JSON.stringify(data)

    // let { data } = await res.json()
    res.status(200).send({ done: true })
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
})

const PORT = process.env.SERVER_PORT || 4000

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
