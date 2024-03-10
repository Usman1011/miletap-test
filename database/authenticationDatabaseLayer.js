const {accounts} = require('../models/accounts');
const {generateSaltedHash, verifyPassword} = require('../utils/encryption-utils');

const getAccountInformationByEmailAndPassword = async (email, password)=>{
    console.log("In getAccountInformationEmail Method", email, password);
    let hashedPassword = await generateSaltedHash(password);
    let user = await accounts.findOne({
        where: {
            email,
        }
    })
    let isPasswordCorrect = await verifyPassword(user.dataValues.password, password)
    if(isPasswordCorrect)
        return user?.dataValues;
    else
        throw new Error("Invalid Credentials")
}

const updateTokenByUserId = async (userId, token)=>{
    console.log("In updateTokenByUserId Method");

    let user = await accounts.update(
        {token}, {
        where: {user_id: userId}
    })
    
    console.log("Retrieved User: ", user?.dataValues);
    return user?.dataValues;

};

const saveAccessToken = async (token, user) =>{
    await accounts.update({token}, {
        where: {
            user_id: user.user_id
        }
    });
};

const getAccessToken = async (token) => {
    let response = await accounts.findOne({
        where: {
            token: token
        }
    });
    return response;
}

module.exports = {
    getAccountInformationByEmailAndPassword,
    updateTokenByUserId,
    saveAccessToken,
    getAccessToken
}