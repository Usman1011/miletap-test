const Sequelize = require("sequelize");


let dbName = process.env.DBNAME;
const dbUser = process.env.DBUSER;
const dbPassword = process.env.DBPASSWORD;
const dbHost = process.env.DBHOST;

const sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPassword,
    {
    host: dbHost,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: false,
        requestTimeout: 300000 },
    },
    port: 1433,
    logging: false,
    }
  );

module.exports =  {
    sequelize
};