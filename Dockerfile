
FROM node:latest
MAINTAINER author
LABEL Name=happy-image-tester-nodejs Version=0.0.0 
COPY package.json /tmp/package.json
RUN cd /tmp && npm install --production

RUN npm install nodemon -g

RUN mkdir -p /usr/src/app && mv /tmp/node_modules /usr/src
WORKDIR /usr/src/app
COPY . /usr/src/app
EXPOSE 3000

CMD npm start

