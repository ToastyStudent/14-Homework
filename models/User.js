// Dependencies
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');

// Creation of the User model
class User extends Model {
  // Establishes a method to run on Instance Data (per user) in order to check their password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Definition of Collumns for the User Model, named id, username, and password respectively

// id is a primary key meaning its referenced as a foreign key elsewhere, 
// is an integer, cannot be null, and autoincrements

// username is a string and cannot be null

// password is a string, cannot be null, and is validated to be at least 4 characters long in length


User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    hooks: {
      // Establishes beforeCreate/beforeUpdate lifecycle "hook" functionality for the User model
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'User'
  }
);

// Exports the User model for other parts of the application to use
module.exports = User;
