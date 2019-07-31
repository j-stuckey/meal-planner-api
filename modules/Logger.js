'use strict';

const morgan = require('morgan');

const logger = morgan(
    process.env.NODE_ENV === 'production' ? 'common' : 'dev',
    {
        //eslint-disable-next-line
        skip: (req, res) => process.env.NODE_ENV === 'test',
    },
);

module.exports = logger;
