const oAuth2Server = require("node-oauth2-server");
const oAuthService = require('../services/oAuthService');

oauth = oAuth2Server({
    model: oAuthService,
    grants: ["password"],
    debug: true,
});

module.exports = {oauth};