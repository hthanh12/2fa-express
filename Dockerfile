FROM node:8.15.1
ENV NODE_ENV production

WORKDIR /usr/src/app

RUN apk add dumb-init

COPY package*.json ./

RUN npm ci --only=production

COPY --chown=node:node . .

RUN cp .env.example .env

USER node

EXPOSE 3000

CMD ["dumb-init", "node", "index.js"]