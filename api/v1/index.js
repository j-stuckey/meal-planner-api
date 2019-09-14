'use strict';

const express = require('express');

const router = express();

router.get('/', (req, res, next) => {
    res.send({ msg: 'API version 1 running' });
});

router.use('/auth', require('./routes/auth'));
router.use('/users', require('./routes/users'));

module.exports = router;
