'use strict';

const express = require('express');
const cors = require('cors');
const logger = require('./modules/Logger');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');

const { dbConnect } = require('./db');

const app = express();

// wraps morgan with winston logger
app.use(
    morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
        stream: logger.stream,
    }),
);

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

// parses request body
app.use(express.json());

app.get('/', (req, res, next) => {

    res.send('Server OK');
});

app.post('/api/users', (req, res, next) => {

    logger.debug(req.body);
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
    dbConnect();
    logger.info('Database connection receieved');
    runServer();
}

module.exports = { app };
