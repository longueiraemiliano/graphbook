FROM node:10 AS build
WORKDIR /usr/src/app
COPY .babelrc ./
COPY package*.json ./
COPY webpack.server.build.config.js ./
COPY webpack.client.build.config.js ./
COPY src src
COPY assets assets
RUN npm install
ENV NODE_ENV=production
ENV JWT_SECRET=JWT_SECRET
ENV ENGINE_KEY=ENGINE_KEY
ENV AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY
ENV username=USER
ENV password=PASSWORD
ENV database=graphbook_dev
ENV host=HOST
RUN npm install -g mysql2 sequelize sequelize-cli
RUN sequelize db:migrate --migrations-path src/server/migrations --config src/server/config/index.js --env production
RUN npm run test
RUN npm run build
FROM node:10
COPY --from=build /usr/src/app/package.json package.json
COPY --from=build /usr/src/app/dist dist
RUN npm install --only=production
EXPOSE 8000
CMD [ "npm", "run", "server:production" ]