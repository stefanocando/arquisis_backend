FROM node:16-alpine AS Development

WORKDIR /src/mqtt

COPY package.json ./ 
COPY package-lock.json ./ 

RUN ls -a
RUN npm install

COPY . . 

ENTRYPOINT node mqtt.js 

EXPOSE 9000
# CMD ["sh", "-c", "npm run start"]