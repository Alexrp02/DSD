FROM node

WORKDIR /app

COPY ./servidor/package.json .

RUN npm install

RUN npm install --global nodemon

WORKDIR /app/src
