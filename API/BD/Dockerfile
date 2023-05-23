FROM node:14-alpine

WORKDIR /BD

COPY package.json package-lock.json .
RUN npm install 

COPY . .

EXPOSE 80

CMD ["npm" , "start"]