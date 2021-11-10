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

Application (Create React App) is served on port 3000 (localhost:3000/)  
Hasura endpoint is served on port 8080 (localhost:8080/)  
Express is served on port 3001 (localhost:3001/)  

### Development

Clone the project
```
git clone https://github.com/minh-v/hackernews-back.git
cd hackernews-back
```
Using npm with two terminals:

In the client folder:
Install the dependencies and start the application.
```
# client
cd client
npm install
npm start
```

In the server folder:
Install the dependencies and start docker-compose, which contains Express, Hasura and PostgreSQL.
```
# server
cd server
npm install
docker-compose up
```

#### Import Hasura metadata
In the Hasura console (localhost:8080)  
Click on the settings (⚙) icon at the top right corner of the console screen.  
Click on Import Metadata button and select the `hasura_metadata_DATE.json` file included in the server root folder.    

## Features
- Display posts using GraphQL subscriptions
- User registration/login, authentication with magic link + jwt token stored in httponly cookie
- Authenticated users can submit and delete posts
- Authenticated users can upvote and downvote posts
- Authenticated users can comment, and upvote and downvote comments
- Sort posts and comments by new/top
- Users can search for posts (url, title)
- User profile page
- Post karma system

#### Environment variables
Environment variables aren't hidden for now (Magic api keys, JWT secret etc.)

#### TODO

- Pagination
- Fix signup flow: When user signs up, they still need to log in.
- When searching for post from sidebar, add search value to search bar
- When users delete comment, replace with "deleted" instead of cascading deletes.