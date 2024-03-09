const {sequelize} = require('../config/database.config');
const Sequelize = require('sequelize');
const accounts = sequelize.define(
    'accounts',
    {
        user_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
		birthday: {
            type: Sequelize.DATEONLY
        },
        token: {
            type: Sequelize.STRING,
        },
		created_at: {
            type: Sequelize.DATEONLY
        },
		last_modified: {
            type: Sequelize.DATEONLY
        } 
    },
    {
        timestamps: false,
    
        // If don't want createdAt
        createdAt: false,
    
        // If don't want updatedAt
        updatedAt: false,
        freezeTableName: true,
      }
)

module.exports = {
    accounts
}