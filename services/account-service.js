const accountDb = require('../database/accounts-db');
const {extractUserIdandAccountInfo} = require('../utils/account-utils');
const {sendRegistrationEmail} = require('../utils/email-utils');
const {generateSaltedHash} = require('../utils/encryption-utils');

async function createUser(account) {
    console.log("In createUser Service: ", account);

    let response = {
        success: false,
        message: ""
    };

    try {
        let previouslyCreatedAccount = await accountDb.getAccountInformationByEmailAndPassword(account.email);
        console.log("previouslyCreatedAccount: ", previouslyCreatedAccount);
        if(previouslyCreatedAccount){
            throw new Error("an account is already registered by this email");
        }

        let hashedPassword = await generateSaltedHash(account.password);
        account.password = hashedPassword;

        let createdUser = await accountDb.createAccount(account);
        console.log("createdUser: ", createdUser);
        if(createdUser.user_id) {

            response.success = true;
            response.message = "Account Successfully Created";
            sendRegistrationEmail(account.email);
        }
    }
    catch(error) {

        console.log("Error in createUser Service: ", error.message);
        response.success = false;
        response.message = error?.message || "Unable to create account";
    }
    finally {
        return response;
    }
}

async function getAccountsList(noOfAccounts) {

    let response = {
        success: false
    };
    console.log("getAccountsList Service");
    try {
        let accountsList = await accountDb.getAllAccountsList();
        if(accountsList.length){
            response.success = true;
            if(accountsList.length > noOfAccounts)
                accountsList = accountsList.slice(0, noOfAccounts);
            response.accountsList = accountsList;
        }
        else {
            throw Error("No Registered Accounts Found")
        }
    }
    catch(error) {
        response.success = true;
        response.accountsList = error?.message || "Unable to fetch accounts";
    }
    finally {
        return response;
    }
}

async function updateAccount(accountInfo) {
    console.log("In updateAccount Service", accountInfo);

    let response = {
        success: false,
        message: ""
    };

    try {
        let userId = extractUserIdandAccountInfo(accountInfo);
        const updateAccountResponse = await accountDb.updateAccountById(userId, accountInfo);
        response.success = true;
        response.message = "Account Information Updated";
    }
    catch(error) {
        console.log("Error in update voucher service");
        response.success = false;
        response.message = error?.message || "Error updating account";
    }
    finally {
        return response
    }
    
}

module.exports = {
    createUser,
    getAccountsList,
    updateAccount
}