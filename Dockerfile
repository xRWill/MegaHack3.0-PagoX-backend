FROM node:alpine

WORKDIR /opt/app

COPY package*.json yarn.lock ./

RUN npm install

COPY . .

# MIGRATE
RUN npm sequelize db:migrate

EXPOSE 3333

CMD ["yarn", "dev"]
