const {accounts} = require('../models/accounts');
const {convertAccountKeysfromCamelToSnake} = require('../utils/account-utils')

async function createAccount(account) {

    console.log("In createAccount Method: ", account);

    let {firstName, lastName, email, phone, password, birthday} = account;
    birthday = new Date(birthday);
    let createdAt = new Date();
    let dbAccount = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        password,
        birthday,
        created_at: createdAt
    }
    let newUser = await accounts.create(dbAccount);
    console.log("newUser: ", newUser)
    return newUser?.dataValues;
};

const getAccountInformationByEmailAndPassword = async (email)=>{
    console.log("In getAccountInformationByEmailAndPassword Method", email);
    let user = await accounts.findOne({
        where: {email: email}
    })
    console.log("Retrieved User: ", user?.dataValues);

    return user?.dataValues;
}

const getAllAccountsList = async () => {

    console.log("In getAllAccountsList DB Method")
    let accountsList = await accounts.findAll();
    console.log("Accounts retrieved from db: ", accountsList.values);
    
    return accountsList;
};

const updateAccountById = async (accountId, account) => {

    console.log("In updateAccountById method");
    convertAccountKeysfromCamelToSnake(account);
    let updatedAccount = await accounts.update(account, {
        where:{
            user_id: accountId
        }
    });
    console.log("Updated Account: ", updatedAccount);
    if(!updatedAccount[0])
        throw new Error(`Account with userId ${accountId} not found.`);

};



module.exports = {
    createAccount,
    getAccountInformationByEmailAndPassword,
    getAllAccountsList,
    updateAccountById
}