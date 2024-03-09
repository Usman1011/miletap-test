const accountService = require('../services/account-service');
const { sendResponse } = require('../utils/response-utils');

async function createaccount(req, res) {

    console.log("in createaccount controller");
    let {
        firstName,
        lastName,
        email,
        phone,
        password,
        birthday
    } = req.body;
    let account = {firstName, lastName, email, phone, password, birthday};
    let createAccountResponse = await accountService.createUser(account);
    res.response = createAccountResponse;
    sendResponse(req, res); 
};

async function getAccountsList(req, res) {

    console.log("In getAccountsList Controller: ", req.query);
    let { noOfAccounts } = req.query; 

    let accountsListResponse = await accountService.getAccountsList(noOfAccounts);
    res.response = accountsListResponse;
    sendResponse(req, res);
};

async function updateAccount(req, res) {
    let accountInfo = req.body;
    let updateAccountResponse = await accountService.updateAccount(accountInfo);
    res.response = updateAccountResponse;
    sendResponse(req, res);
}


module.exports = {
    createaccount,
    getAccountsList,
    updateAccount
}