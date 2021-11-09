# Hackernews/Reddit clone
This project is intended to be a "clone" of hackernews/reddit, implementing some of their features.

## Built With

- [React.js](https://reactjs.org/)
- [Antd](https://ant.design/)
- [Magic](https://magic.link/)
- [Express.js](https://expressjs.com/)
- [Postgresql](https://www.postgresql.org/)
- [Hasura](https://hasura.io/)
- [Docker](https://www.docker.com/)

## Getting Started
### Prerequisites

- [Node](https://nodejs.org/en/) (v17.0.1)
- [npm](https://www.npmjs.com/get-npm)
- [Docker Desktop](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
 <!-- or [yarn](https://classic.yarnpkg.com/en/docs/install) -->
## Installation and Setup

Hasura endpoint is served on port 8080 (localhost:8080/)  
Application (Create React App) is served on port 3000 (localhost:3000/)  
Express is served on port 3001 (localhost:3001/)  

### Development

Clone the project
```
git clone https://github.com/minh-v/hackernews-back.git
```
Using npm with two terminals:

In the client folder:
Install the dependencies and start the application.
```
# client
npm install
npm start
```

In the server folder:
Install the dependencies and start docker-compose
```
# server
npm install
docker-compose up
```
## Features
- Graphql subscription to query posts for real time updates
- User registration/login, authentication with magic link + jwt token stored in httponly cookie
- Authenticated users can submit and delete posts
- Authenticated users can upvote and downvote posts
- Authenticated users can comment, and upvote and downvote comments
- Sort posts and comments by new/top
- Users can search for posts (url, title)
- User profile page
- Post karma system

#### TODO

- Pagination
- Fix signup flow
