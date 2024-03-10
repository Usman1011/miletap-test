const {getAccountInformationByEmailAndPassword} = require('../database/authenticationDatabaseLayer');
const {accounts} = require('../models/accounts');
const authenticationDb = require('../database/authenticationDatabaseLayer');


function getClient(clientID, clientSecret, cbFunc) {
    console.log("oAuthService getClient Method: ", clientID);
    const client = {
        clientID,
        clientSecret,
        grants: null,
        redirectUris: null,
    };

    cbFunc(false, client);
}

function grantTypeAllowed(clientID, grantType, cbFunc) {
    console.log("oAuthService grantTypeAllowed Method: ", clientID);

    cbFunc(false, true);
}

async function getUser(username, password, cbFunc) {

    try {
        console.log("oAuthService getUser Method: ", username);
        let user = await getAccountInformationByEmailAndPassword(username, password);
        cbFunc(false, user);
    }
    catch(error) {
        cbFunc(error)
    }
}

async function saveAccessToken(accessToken, clientID, expires, user, cbFunc) {

    console.log("saveAccessToken Method: ", user);
    try {
        await authenticationDb.saveAccessToken(accessToken, user);
        cbFunc(false);

    }
    catch(error) {
        cbFunc(error, {});
    }
}

async function getAccessToken(bearerToken, cbFunc) {

    console.log("getAccessToken method: ", bearerToken);

    let userID = await authenticationDb.getAccessToken(bearerToken);
    console.log("HEll: ", userID);
    const accessToken = {
        user: {
            id: userID,
        },
        expires: null,
    };
    cbFunc(userID === null, userID === null ? null : accessToken);

}

module.exports = {
    getClient,
    saveAccessToken,
    getUser,
    grantTypeAllowed,
    getAccessToken,
};