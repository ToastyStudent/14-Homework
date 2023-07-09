const Sequelize = require('sequelize');

require('dotenv').config();

// Creates the Connection to the database, passes in the hidden MySQL information for username, 
// password, and database name from the .env file

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });

module.exports = sequelize;
