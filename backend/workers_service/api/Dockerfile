FROM node:16-alpine

WORKDIR /workers

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "start" ]

EXPOSE 3000