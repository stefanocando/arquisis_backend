FROM node:16-alpine AS Development

WORKDIR /src/server

COPY package.json ./ 
COPY package-lock.json ./ 

RUN ls -a
RUN npm install

COPY . . 

ENTRYPOINT npx sequelize db:migrate && npm start

EXPOSE 8080