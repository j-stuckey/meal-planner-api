'use strict';

const winston = require('winston');

const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        request: 3,
        verbose: 4,
        debug: 5,
    },
    colors: {
        debug: 'blue',
        info: 'blue',
        request: 'green',
        warn: 'yellow',
        crit: 'yellow',
        error: 'red',
    },
};

winston.addColors(customLevels.colors);

const logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston.format.simple(),
        }),
        new winston.transports.File({
            format: winston.format.simple(),
            filename: 'logs/combined.log',
        }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            ),
            level: 'debug',
        }),
    );
}

logger.stream = {
    write: function(message, encoding) {
        logger.request(message.replace(/\n$/, ''));
    },
};

module.exports = logger;
