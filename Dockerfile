FROM node:14.15.4-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --production --no-optional

COPY ./src ./src

EXPOSE 3000

CMD [ "node", "src/index" ]
