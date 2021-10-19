const { serialize } = require("cookie")

const AGE = 60 * 60 * 24 * 7
const TOKEN_NAME = "token"
const setCookie = (res, token) => {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: AGE, //1 week
    expires: new Date(Date.now() + AGE * 1000),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  })
  res.setHeader("Set-Cookie", cookie)
  //res.setHeader("Access-Control-Allow-Credentials", "true")
}

module.exports = { setCookie }
