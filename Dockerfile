# Usar una imagen base con Node.js
FROM node:latest

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

ENV PORT=3000

EXPOSE 3000

CMD ["yarn", "preview"]
