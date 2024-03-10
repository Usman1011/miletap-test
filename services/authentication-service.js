const {getAccountInformationByEmailAndPassword, updateTokenByUserId} = require('../database/authenticationDatabaseLayer');
const {generateSaltedHash} = require('../utils/encryption-utils');

async function login(userName, password, email) {
    console.log("In Login Service: ", userName, password, email);
    
    let isUserAuthenticated = false;
    try {
        let dbUser = await getAccountInformationByEmailAndPassword(email);
        if(email === dbUser?.email)
        {
            console.log(`User with specified email ${email} found`);
            if(password === dbUser.password) {
                isUserAuthenticated = true;
                console.log(`password matched ${email}`);

                let token = await generateSaltedHash(email);
                await updateTokenByUserId(dbUser.user_id, token);

            }
            else 
                throw new Error("Invalid Credentials")
        }
        else {
            throw new Error("Invalid Credentials")
        }
        console.log("Login Service: ", isUserAuthenticated);
    }
    catch(error) {
        console.log("Login Service Error: ", error.message);
        throw error;
    }
    return isUserAuthenticated;

}

module.exports = {
    login
}