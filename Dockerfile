FROM node:14

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

RUN yarn global add pm2

ADD . /usr/src/app

RUN yarn build

EXPOSE 5000

ENV PM2_ARGS=--no-daemon

CMD ["yarn", "start"]
