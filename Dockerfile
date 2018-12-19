FROM node:10.14.2-alpine

RUN mkdir -p /opt/app/https /opt/app/lib /opt/app/public /opt/app/static

COPY ecosystem.config.js /opt/app/
COPY index.js /opt/app/
COPY package.json /opt/app/

COPY ./https/cert.pem /opt/app/https/
COPY ./https/key.pem /opt/app/https/

COPY ./lib/EventAPI.js /opt/app/lib/
COPY ./lib/FBWebhook.js /opt/app/lib/
COPY ./lib/TGWebhook.js /opt/app/lib/
COPY ./lib/UsersAPI.js /opt/app/lib/
COPY ./lib/server.js /opt/app/lib/

COPY ./public/logo.png /opt/app/public/

COPY ./static/hello.html /opt/app/static

WORKDIR /opt/app
RUN npm install

EXPOSE 8085 8086 80
CMD ["node", "./node_modules/pm2/bin/pm2-runtime", "start", "./ecosystem.config.js", "--web"]