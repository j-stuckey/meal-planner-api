'use strict';

const express = require('express');
const logger = require('modules/Logger');

const router = express();

router.get('/register', (req, res, next) => {
    logger.debug('in register');
    res.status(429).send("Too many requests");
});

module.exports = router;
