// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

// Creation of the Comment model
class Comment extends Model {}

Comment.init(
  {
    // Definition of Collumn for the Comment Model, named body
    
    // body is a string and cannot be null
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize
  }
);

// Exports the Comment model for other parts of the application to use
module.exports = Comment;
