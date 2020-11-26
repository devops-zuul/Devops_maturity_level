FROM node:12.18.1
ENV NODE_ENV=production

WORKDIR /app


RUN npm install
RUN npm install jade
RUN npm install express
RUN npm install express-session memorystore
RUN npm install mysql
RUN npm install body-parser
RUN npm install express-session
RUN npm install express-es6-template-engine
RUN npm install path
COPY .  /DevOps_Maturity_Assessment
COPY package*.json ./
COPY . .
CMD [ "node", "server.js" ]
