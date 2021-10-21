const express = require("express")
const jwt = require("jsonwebtoken")
const magic = require("./magic")
const cors = require("cors")

const cookieParser = require("cookie-parser")
const { GraphQLClient } = require("graphql-request")
const { ADD_USER } = require("./graphql/queries")
const { setCookie } = require("./lib/cookies")

const { gql } = require("graphql-request")

const app = express()
const AGE = 60 * 60 * 24 * 7 * 10
const corsOptions = {
  origin: true,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cookieParser())
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json())

const client = new GraphQLClient("http://graphql-engine:8080/v1/graphql", {
  headers: {
    "Content-Type": "application/json",
    // "x-hasura-admin-secret": HASURA_GRAPHQL_ADMIN_SECRET,
  },
})

app.get("/", (req, res) => {
  res.send("<h1>hasdssdasdas</h1>")
})

//returns user given jwt from cookie, refreshes the jwt.
app.get("/user", async (req, res) => {
  const GET_USERNAME = gql`
    query getUsername($issuer: String!) {
      users(where: { issuer: { _eq: $issuer } }) {
        username
      }
    }
  `
  try {
    if (!req.cookies.token) return res, json({ user: null })

    const token = req.cookies.token
    const user = jwt.verify(token, process.env.JWT_SECRET)

    const { issuer, publicAddress, email } = user

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    }

    //get username
    const data = await client.request(GET_USERNAME, { issuer: issuer }, headers)

    user.username = data.users[0].username
    // Refresh the JWT for the user each time they send a request to /user so they only get logged out after (7) days of inactivity
    let newToken = jwt.sign(
      {
        issuer,
        publicAddress,
        email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": `${issuer}`,
        },
      },
      process.env.JWT_SECRET
    )
    res.cookie("token", newToken, {
      maxAge: AGE, //1 week
      expires: new Date(Date.now() + AGE * 1000),
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    })

    res.status(200).json({ user })
  } catch (error) {
    res.status(200).json({ user: null })
  }
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

    //add user to hasura, add date created?
    const data = await client.request(ADD_USER, variables, headers)
    //set cookie token here
    //setCookie(res, token)
    res.cookie("token", token, {
      maxAge: AGE, //1 week
      expires: new Date(Date.now() + AGE * 1000),
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    })
    res.status(200).send({ done: true })
  } catch (error) {
    console.log("error: ", error)
    res.status(500).end()
  }
})

app.post("/login", async (req, res) => {
  try {
    const didToken = req.headers.authorization.substr(7)
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
    //setCookie(res, token)
    res.cookie("token", token, {
      maxAge: AGE, //1 week
      expires: new Date(Date.now() + AGE * 1000),
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    })
    res.status(200).send({ done: true })
  } catch (error) {
    res.status(500).end()
  }
})

app.get("/logout", async (req, res) => {
  if (!req.cookies.token) return res.status(401).json({ message: "User is not logged in" })
  const token = req.cookies.token
  const user = jwt.verify(token, process.env.JWT_SECRET)
  res.cookie("token", "", { maxAge: -1, path: "/" })
  // Add the try/catch because a user's session may have already expired with Magic (expired 7 days after login)
  try {
    await magic.users.logoutByIssuer(user.issuer)
  } catch (error) {
    console.log("Users session with Magic already expired")
  }
  res.writeHead(302, { Location: "/login" })
  res.end()
})

const PORT = process.env.SERVER_PORT || 4000

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
