FROM node

WORKDIR /app

COPY ./servidor/package.json .

RUN ls -la .

RUN npm install

RUN npm install --global nodemon

WORKDIR /app/src