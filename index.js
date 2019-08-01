'use strict';

const express = require('express');
const cors = require('cors');
const logger = require('./modules/Logger');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');

const app = express();

// wraps morgan with winston logger
app.use(
    require('morgan')(
        process.env.NODE_ENV === 'production' ? 'common' : 'dev',
        { stream: logger.stream },
    ),
);

// parses request body
app.use(express.json());

app.get('/', (req, res, next) => {
    res.send('Server OK');
});

function runServer(port = PORT) {
    const server = app
        .listen(port, () => {
            logger.info(`App listening on port ${server.address().port}`);
        })
        .on('error', err => {
            logger.error('Express failed to start');
            logger.error(err);
        });
}

if (require.main === module) {
    // dbConnect();
    runServer();
}

module.exports = { app };
