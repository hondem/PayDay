FROM node:10

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

USER node
RUN npm install

COPY --chown=node:node ./src ./src

RUN npm run build

EXPOSE 5000

CMD [ "node", "dist/app.js" ]