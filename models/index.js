// Import Models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// The following code defines the relationship between each of the models
// and one another

// Post belongsTo User, meaning that the Post model 
// has a foreign key in the form of "userId" that references the
// User model's primary key of "id"
Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

// Posts have many Comments, meaning that a single Post can have 
// multiple Comments and that each one of said Comments has a foreign key
// in the form of "postId" that references the Post model's primary key of "id"
Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

// Comments belong to User, meaning that the Comment model has a foreign key in 
// the form of "userId" that references the User model's primary key of "id"
Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

// Exports the User, Post, and Comment models for other parts of the application to use
module.exports = {
  User,
  Comment,
  Post
};
