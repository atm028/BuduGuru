const http = require('http');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const winston = require('winston');
const WinstonDailyRotatingFile = require('winston-daily-rotate-file');
const WinstonElasticsearch = require('winston-elasticsearch');
const WinstonSlack = require('winston-slack-transport');

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
        }),
        new WinstonElasticsearch({
            indexPattern: '[log-]YYYY-MM-DD',
            type: 'logs',
            host: 'localhost:9200',
            level: 'debug'
        }),
        new WinstonSlack({
            webhook_url: 'https://hooks.slack.com/services/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',
            channel: '#applogs',
            username: 'BuduGuru',
            level: "error"
        })
    ]
});


if(cluster.isMaster) {
    log.debug("Server started: http://localhost:8085");

    for(let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log("Worker %s died", worker.process.pid);
    });
} else {
    const server = http.createServer( (request, response) => {
        const body = "Hello World!";
        response.writeHead(200, {
            "Content-length": Buffer.byteLength(body),
            "Content-Type": "plain/text"
        });
        response.end(body);
    });
    server.listen(8085);   
    console.log('Worker %s started', process.pid);
}
