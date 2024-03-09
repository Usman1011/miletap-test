const {accounts} = require('../models/accounts');

const getAccountInformationByEmail = async (email)=>{
    console.log("In getAccountInformationEmail Method", email);

    let user = await accounts.findOne({
        where: {email: email}
    })
    
    console.log("Retrieved User: ", user?.dataValues);
    return user?.dataValues;

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
    getAccountInformationByEmail,
    updateTokenByUserId,
    saveAccessToken,
    getAccessToken
}