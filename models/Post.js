// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

// Creation of the Post model
class Post extends Model {}

Post.init(
  {
    // Definition of Collumns for the Post Model, named title and body respectively
    
    // title is a string and cannot be null
    // body is a string and cannot be null
    title: DataTypes.STRING,
    body: DataTypes.STRING
  },
  {
    sequelize
  }
);

// Exports the Post model for other parts of the application to use
module.exports = Post;
