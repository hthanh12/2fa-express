FROM node:8.15.1
ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD ["node", "index.js"]