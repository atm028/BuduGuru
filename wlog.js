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

log.info("this is info message");
log.debug("this is debug message");
log.error("this is error message");