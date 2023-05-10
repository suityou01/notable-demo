FROM node:16
WORKDIR /app
COPY package*.json .
RUN NODE_ENV=development && npm ci
RUN npm install typescript @types/node ts-node nodemon -D
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

