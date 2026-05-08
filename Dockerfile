# base
FROM node:20 AS base

WORKDIR /app

COPY /app/package*.json ./

# development
FROM base AS development

RUN npm install

COPY /app ./

CMD ["npm","run","dev"]

# production

FROM node:20-alpine AS production

WORKDIR /app

COPY /app/package*.json ./
RUN npm ci --omit=dev

COPY /app ./

EXPOSE 3000

CMD ["npm", "run", "start"]