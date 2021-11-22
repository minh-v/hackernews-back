# Hackernews/Reddit clone
This project is intended to be a "clone" of hackernews/reddit, implementing some of their features.

<img src="https://i.imgur.com/OoOvqDW.png" width="100%" alt="front page picture" />  

## Built With

- [React.js](https://reactjs.org/)
- [Antd](https://ant.design/)
- [Magic](https://magic.link/)
- [Express.js](https://expressjs.com/)
- [Hasura](https://hasura.io/)
- [Postgresql](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Getting Started
### Prerequisites

- [Node](https://nodejs.org/en/) (v17.0.1)
- [npm](https://www.npmjs.com/get-npm)
- [Docker Desktop](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
 <!-- or [yarn](https://classic.yarnpkg.com/en/docs/install) -->
## Installation and Setup

Application (Create React App) is served on port 3000 (localhost:3000/)  
Hasura endpoint is served on port 8080 (localhost:8080/)  
Express is served on port 3001 (localhost:3001/)  

### Development

Clone the project
```
git clone https://github.com/minh-v/hackernews-back.git
cd hackernews-back/
```
Using npm with two terminals:

In the client folder:
Install the dependencies.
```
# client
cd client
npm install
```

In the server folder:
Install the dependencies.  
Database migrations and metadata should automatically be applied.  
```
# server
cd server
npm install
```
Start docker-compose
```
cd hackernews-back
docker-compose up
```
To use the hasura console:
```
cd server/hackernews-hasura
npx hasura console
```
Console will be available at localhost:9695/

#### Environment variables
Environment variables aren't hidden for now (Magic api keys, JWT secret etc.)

## Features
- Display posts using GraphQL subscriptions
- User registration/login, authentication with magic link + jwt token stored in httponly cookie
- Authenticated users can submit and delete posts
- Authenticated users can upvote and downvote posts
- Authenticated users can comment, and upvote and downvote comments
- Sort posts and comments by new/top
- Users can search for posts (url, title) and sort
- User profile page
- Post karma system
- Pagination
- Responsive design

#### TODO / Bugs

- when users comment, action bars don't get refreshed.
- Create initial seed for db
- When users delete comment, replace with "deleted" instead of cascading deletes.
- On all handlesubmits, disable the button at the beginning and reenable at the end