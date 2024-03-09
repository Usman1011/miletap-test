const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account-controller');
const {oauth} = require('../config/oauth.config');

router.post('/createaccount', accountController.createaccount);
router.get('/list',[oauth.authorise()], accountController.getAccountsList);
router.put('/update', accountController.updateAccount);


module.exports = router;