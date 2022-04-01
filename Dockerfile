FROM node:alpine3.14@sha256:a832603cdf1978e575d61cdb2833ba9133b469d0e00b4517f06bd6a255526741
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