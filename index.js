    'use strict';

const express = require('express');
const cors = require('cors');
const logger = require('./modules/Logger');
const morgan = require('morgan');

const passport = require('passport');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

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

// Custom 404 Not Found route handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    logger.error(err);
    next(err);
});

app.use((err, req, res, next) => {
    if (err.status) {
        const errBody = Object.assign({}, err, { message: err.message });
        logger.error(err.message);
        res.status(err.status).json(errBody);
    }
    if (err.message) {
        res.json({ err: err.message });
    } else {
        res.status(500).json({ message: 'Internal Server Error' });
    }
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
