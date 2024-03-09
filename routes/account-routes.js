const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account-controller');

router.post('/createaccount', accountController.createaccount);
router.get('/list', accountController.getAccountsList);
router.put('/update', accountController.updateAccount);


module.exports = router;