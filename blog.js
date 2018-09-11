const bunyan = require('bunyan');
const BunyanRotatingFileStream = require('bunyan-rotating-file-stream');
const ElasticsearchStream = require('bunyan-stream-elasticsearch');
const BunyanSlack = require('bunyan-slack');

const esStream = new ElasticsearchStream({
    indexPattern: '[log-]YYYY-MM-DD',
    type: 'logs',
    host: 'localhost:9200',
});

esStream.on('error', (err) => {});

const log = bunyan.createLogger({
    name: "hellowrold",
    hostname: "myhost",
    streams: [
        {
            stream: process.stdout,
            level: 'error'
        },
        {
            stream: esStream,
            level: 'debug'
        },
        {
            level: 'debug',
            stream: new BunyanRotatingFileStream({
                path: "./app.log",
                period: '1d',
                rotateExisting: true,
                threshold: '10m',
                gzip: true
            })
        },
        {
            level: 'fatal',
            stream: new BunyanSlack({
                webhook_url: 'https://hooks.slack.com/services/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',
                channel: '#applogs',
                username: 'BuduGuru'
            })
        }
    ]
});

process.on('unhandledRejection', err => {});

log.info("this is info message");
log.debug("this is debug message");
log.error("this is error message");
log.fatal("Service stopped");