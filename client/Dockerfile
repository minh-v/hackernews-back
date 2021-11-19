FROM node:16-alpine3.12

WORKDIR /app/client

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

EXPOSE 3000

COPY . .

RUN export NODE_OPTIONS=--openssl-legacy-provider

CMD ["npm", "start"]