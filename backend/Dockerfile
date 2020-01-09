FROM node:12-alpine

RUN mkdir /usr/app
WORKDIR /usr/app

COPY package.json .
COPY cert.cer /var/lib/boot2docker/certs/
RUN npm install --quiet
RUN npm install -g nodemon --quiet
RUN npm set strict-ssl false

COPY . .