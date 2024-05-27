FROM node

WORKDIR /app

COPY ./agente/package.json .

RUN npm install

RUN npm install --global nodemon

WORKDIR /app/src
