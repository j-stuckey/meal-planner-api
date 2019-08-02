'use strict';

const express = require('express');
const cors = require('cors');
const logger = require('./modules/Logger');
const morgan = require('morgan');

const passport = require('passport');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');

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
        origin: CLIENT_ORIGIN,
    }),
);

// parses request body
app.use(express.json());

// Configures pasport to use the Strategies
passport.use(localStrategy);
passport.use(jwtStrategy);


app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);


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
