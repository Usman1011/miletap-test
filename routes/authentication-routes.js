const express = require('express');
const router = express.Router();
const authenticationConroller = require('../controllers/authentication-controller');
const {oauth} = require('../config/oauth.config');

router.post('/login',oauth.grant(), authenticationConroller.login);

module.exports = router;