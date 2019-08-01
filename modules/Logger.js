'use strict';

const winston = require('winston');

const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
    },
    colors: {
        debug: 'blue',
        info: 'green',
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
            filename: 'combined.log',
            timestamp: true,
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

module.exports = logger;
