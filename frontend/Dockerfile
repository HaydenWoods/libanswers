FROM node:12-alpine

RUN mkdir /usr/app
WORKDIR /usr/app

RUN yarn global add serve
COPY package.json .
RUN yarn
RUN yarn add react-scripts
ADD . .

EXPOSE 3000