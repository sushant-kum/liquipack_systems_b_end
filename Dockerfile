FROM node:10

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

RUN npm install pm2 -g
CMD [ "pm2-runtime", "--name", "liquipack_systems_b_end", "index.js" ]