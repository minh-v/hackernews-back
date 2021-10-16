const gql = require("gql")

const mutation = gql`
mutation AddUser ($email: String!, $issuer: String!, publicAddress: String!, username: String!) {
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

module.export = { INSERT_USERS_ONE }
