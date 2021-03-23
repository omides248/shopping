FROM node:14.16.0-alpine3.13
WORKDIR /usr/src/frontend
COPY ./package.json ./
#RUN npm install yarn
#RUN yarn install
COPY . .
CMD ["yarn", "start"]