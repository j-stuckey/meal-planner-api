'use strict';

const express = require('express');
const logger = require('../../modules/Logger');

const router = express();

router.get('/', (req, res, next) => {
    logger.debug('Version 2');
    res.send({ msg: 'API version 2' });
});

router.use('/auth', require('../../controllers/auth'));
router.use('/users', require('../../controllers/users'));

module.exports = router;
