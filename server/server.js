const express = require("express")
const jwt = require("jsonwebtoken")
const magic = require("./magic")
const cors = require("cors")
const { GraphQLClient } = require("graphql-request")
const { ADD_USER, CHECK_USER } = require("./graphql/queries")

const app = express()
app.use(cors())
app.use(express.json())

const client = new GraphQLClient("http://graphql-engine:8080/v1/graphql", {
  headers: {
    "Content-Type": "application/json",
    // "x-hasura-admin-secret": HASURA_GRAPHQL_ADMIN_SECRET,
  },
})

const isNewUser = async (issuer, headers) => {
  try {
    const data = await client.request(CHECK_USER, { issuer: issuer }, headers)
    return data.length === 0 ? true : false
  } catch (error) {
    console.log(error)
  }
}

app.get("/", (req, res) => {
  res.send("<h1>hasdssdasdas</h1>")
})

///request sends didtoken and username
//create jwt with didtoken metadata, add user to hasura postgres then send back jwt as cookie
app.post("/signup", async (req, res) => {
  try {
    //get DID token, username from post req
    const didToken = req.headers.authorization.substr(7)
    const username = req.body.username

    await magic.token.validate(didToken) //validate the DID token
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
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      },
      process.env.JWT_SECRET
    )

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    }

    const variables = {
      email: metadata.email,
      issuer: metadata.issuer,
      publicAddress: metadata.publicAddress,
      username: username,
    }

    //add user to hasura
    const data = await client.request(ADD_USER, variables, headers)

    console.log("data", data)
    return JSON.stringify(data)

    //set cookie token here?
    res.status(200).send({ done: true })
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
})

app.post("login", (req, res) => {
  //try this
})

const PORT = process.env.SERVER_PORT || 4000

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
