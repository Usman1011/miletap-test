const bcrypt = require('bcrypt');
const saltRounds = 10;

async function generateSaltedHash(plainText) {
    let hash = await bcrypt.hash(plainText, saltRounds)
    return hash;
}

module.exports = {
    generateSaltedHash
}