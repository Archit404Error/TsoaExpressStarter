FROM node:18

RUN mkdir /usr/app
WORKDIR /usr/app

COPY yarn.lock .
COPY package.json .

RUN yarn install
COPY . .
RUN yarn build
EXPOSE 8000
CMD ["yarn", "start"]