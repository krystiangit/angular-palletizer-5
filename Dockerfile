



FROM node:12.7-alpine AS ui-build
WORKDIR /usr/src/app
COPY . .
RUN  npm install @angular/cli && npm install && npm run build

FROM node:12.7-alpine AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/dist/angular-palletizer2 ./dist/angular-palletizer2
COPY package*.json ./
RUN npm install
COPY server.js .
COPY server/routes/api.js server/routes/api.js
COPY middleware/logger.js middleware/logger.js
COPY /json ./json

EXPOSE 4600

CMD ["node", "server.js"]
