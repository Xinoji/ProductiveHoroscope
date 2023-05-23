FROM node:14-alpine

WORKDIR /client

RUN npm install -g http-server

COPY . .

EXPOSE 80

CMD ["npm" , "start"]