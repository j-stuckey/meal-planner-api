FROM node:12 as base
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g nodemon
RUN npm install
