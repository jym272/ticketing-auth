FROM node:19-alpine AS base

FROM base

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

#COPY . .
#
#ENV NODE_ENV development
#
#RUN npm run build
#
#CMD npm run dev
