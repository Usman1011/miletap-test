const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const {sequelize} = require('./config/database.config');
const { configureApplication } = require('./config/app.config');
const PORT = process.env.PORT


configureApplication(app);

sequelize.sync({ 
    alter: true
 })
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server Running on Port: ", PORT);
    });
}, (error)=>{
    console.log("Your database failed to connect: ", error.message);
})

module.exports = {
    app
}