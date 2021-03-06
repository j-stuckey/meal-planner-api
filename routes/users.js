'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('../modules/Logger');

const User = require('../models/user');

const router = express.Router();

router.post('/', (req, res, next) => {
    let { username, password, email } = req.body;

    return User.hashPassword(password)
        .then(digest => {
            const newUser = {
                email,
                username: username.toLowerCase(),
                password: digest
            };
            return User.create(newUser);
        })
        .then(result => {
            return res
                .status(201)
                .location(`/api/users/${result.id}`)
                .json(result);
        })
        .catch(err => {
            if (err.code === 11000) {
                err = new Error(`Username '${req.body.username}' is taken`);
                err.status = 400;
            }
            next(err);
        });
});

module.exports = router;
