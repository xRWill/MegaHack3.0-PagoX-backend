FROM node:alpine

WORKDIR /opt/app

COPY package*.json ./

RUN npm install

COPY . .

# MIGRATE
# RUN node --harmony ace migration:run --force

EXPOSE 3333

CMD ["npm", "start"]
