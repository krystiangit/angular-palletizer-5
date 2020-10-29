

FROM node:12.7-alpine AS step1
WORKDIR /usr/src/app
COPY . .
RUN  npm install --production @angular/cli && npm install  && npm run build --prod
COPY package*.json ./
#RUN npm install --production
#RUN npm install nodes7

FROM node:12.7-alpine AS step2
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production && npm install  nodes7
#&& npm install material-design-icons --save
#RUN npm install nodes7

FROM node:12.7-alpine AS step3
WORKDIR /root/
COPY --from=step1 /usr/src/app/dist/angular-palletizer2 ./dist/angular-palletizer2
COPY --from=step2 /usr/src/app/node_modules ./node_modules/
COPY server.js .
COPY server/routes/api.js server/routes/api.js
COPY middleware/logger.js middleware/logger.js
COPY middleware/connection.js middleware/connection.js
COPY /json ./json

EXPOSE 4600

CMD ["node", "server.js"]



#FROM node:12.7-alpine AS ui-build
#WORKDIR /usr/src/app
#COPY . .
#RUN  npm install @angular/cli && npm install && npm run build

#FROM node:12.7-alpine AS server-build
#WORKDIR /root/
#COPY --from=ui-build /usr/src/app/dist/angular-palletizer2 ./dist/angular-palletizer2
#COPY package*.json ./
#RUN npm install
#COPY server.js .
#COPY server/routes/api.js server/routes/api.js
#COPY middleware/logger.js middleware/logger.js
#COPY /json ./json

#EXPOSE 4600

#CMD ["node", "server.js"]
