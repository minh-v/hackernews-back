FROM node:16-alpine3.12

# Build args
ARG NODE_ENV
ARG REACT_APP_API_URL
ARG REACT_APP_HASURA_ENDPOINT

# Env vars
ENV NODE_ENV=$NODE_ENV
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_HASURA_ENDPOINT=$REACT_APP_HASURA_ENDPOINT

WORKDIR /app/client

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

EXPOSE 3000

COPY . .

RUN export NODE_OPTIONS=--openssl-legacy-provider

CMD ["npm", "start"]