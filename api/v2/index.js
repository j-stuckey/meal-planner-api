'use strict';

const express = require('express');

const router = express();

router.get('/', (req, res, next) => {
    res.send({ msg: 'API version 2 running' });
});

router.use(require('./register'));


module.exports = router;
