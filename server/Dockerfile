FROM node:latest
ENV NODE_ENV=development

WORKDIR /app/server

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

EXPOSE 3001

COPY . .

CMD ["nodemon -L", "server.js"]