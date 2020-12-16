FROM node:latest

WORKDIR /App

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8082

CMD ["node", "server.js"]
