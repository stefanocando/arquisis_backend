FROM node:16-alpine AS Development

WORKDIR /mqtt:publisher

COPY package.json ./
COPY package-lock.json ./

RUN ls -a

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "start" ]

EXPOSE 10000