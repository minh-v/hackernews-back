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
- [Docker Desktop](https://www.docker.com/get-started)
 <!-- or [yarn](https://classic.yarnpkg.com/en/docs/install) -->
## Installation and Setup

Hasura endpoint is served on port 8080 (localhost:8080/)  
Application (Create React App) is served on port 3000 (localhost:3000/)  
Express is served on port 3001 (localhost:3001/)  

### Development
Using npm with two terminals:

```
# client
# install dependencies
$ npm install

# start client
$ npm start
```

```
# server
# install dependencies
$ npm install

# start servers
$ docker-compose up
```
## Features
subscription to query posts for real time updates

user registration/login, authentication with magic link + jwt token stored in httponly cookie

authenticated users can submit and delete posts

posts upvote, downvote functionality

search bar functionality (url, title)

comments functionality, upvote + downvote

sort posts and comments by new/top

user profile page

basic karma post functionality

## TODO

pagination

FIX REFRESH login/signup flows

bad to query user id from front end?
