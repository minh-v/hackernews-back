const express = require("express")

const app = express()

app.get("/", (req, res) => {
  res.send("<h1>hasdssdasdas</h1>")
})

const PORT = process.env.SERVER_PORT || 4000

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
