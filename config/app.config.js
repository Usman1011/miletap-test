const {authenticationRoutes} = require('../routes/index');
const {accountController} = require('../routes/index');
const express = require('express');
const {oauth} = require('../config/oauth.config');



function configureApplication(app) {
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ extended: true }));

    app.use('/authentication', authenticationRoutes);
    app.use('/account', accountController);
    app.use(oauth.errorHandler());
    
};

module.exports = {
    configureApplication
}