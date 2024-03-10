const bcrypt = require('bcrypt');
const saltRounds = 10;

async function generateSaltedHash(plainText) {
    console.log("In generateSaltedHash method");
    let hash = await bcrypt.hash(plainText,0)
    return hash;
}

async function verifyPassword(hashedPassword, originalPassword){
    console.log("In comparePassword method");
    let res = await bcrypt.compare(originalPassword, hashedPassword);
    console.log("Out generateSaltedHash method: ", res);

    return res;
}
module.exports = {
    generateSaltedHash,
    verifyPassword
}