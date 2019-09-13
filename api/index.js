'use strict';

const express = require('express');

const router = express();

router.get('/', (req, res, next) => {
    res.send({ msg: 'Running' });
});

router.use('/api/v2', require('./v2'));

module.exports = router;
