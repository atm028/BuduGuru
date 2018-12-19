const http = require('http');
const https = require('https');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const winston = require('winston');
const WinstonDailyRotatingFile = require('winston-daily-rotate-file');
const WinstonElasticsearch = require('winston-elasticsearch');
const WinstonSlack = require('winston-slack-transport');
const fs = require('fs');
const path = require('path');
const url = require('url');

const express = require('express');
const bodyParser = require('body-parser');

var appExpress = express();
appExpress.use(bodyParser.json());

const userAPI = require('./UsersAPI');
appExpress.use(userAPI);


const log = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({ level: 'error'}),
        new WinstonDailyRotatingFile({
            filename: "app-%DATE%.log",
            datePattern: 'YYYY-MM-DD',
            maxSize: '10m',
            zippedArchive: true,
            level: "debug"
        })//,
//        new WinstonElasticsearch({
//            indexPattern: '[log-]YYYY-MM-DD',
//            type: 'logs',
//            host: 'localhost:9200',
//            level: 'debug'
//        }),
//        new WinstonSlack({
//            webhook_url: 'https://hooks.slack.com/services/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',
//            channel: '#applogs',
//            username: 'BuduGuru',
//            level: "error"
//        })
    ]
});

var server = {};
server.init = () => {
    server.basePath = path.join(__dirname, "../");
    server.httpsServerOps = {
        'key': fs.readFileSync(path.join(server.basePath,'https/key.pem')),
        'cert': fs.readFileSync(path.join(server.basePath, 'https/cert.pem'))
    };
    server.httpServer = http.createServer(appExpress);
    server.httpsServer = https.createServer(server.httpsServerOps, appExpress); 
    server.httpServer.listen(8085, () => console.log('HTTP Server started on 8085'));   
    server.httpsServer.listen(8086, () => console.log('HTTPS Server started on 8086'));   

    appExpress.get('/', (req, res) => res.status(200).json({"msg": "handled  by GET of index"}));
    appExpress.use("/public", express.static(path.join(server.basePath, 'public')));
    appExpress.use("/static", express.static(path.join(server.basePath, 'static')));
    appExpress.use((req, res) => res.status(404).json({"error": "unsupported endpoint"}));
}

module.exports = {
    'server': server,
    'app': appExpress
};