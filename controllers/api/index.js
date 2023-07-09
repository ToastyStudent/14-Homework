// Dependencies
const router = require('express').Router();

// Imports the routes from the "user-routes.js", "post-routes.js", and "comment-routes.js" files
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// Adds the prefix of `/user` to all of the user routes imported from the "user-routes.js" file
// Adds the prefix of `/post` to all of the post routes imported from the "post-routes.js" file
// Adds the prefix of `/comment` to all of the comment routes imported from the "comment-routes.js" file
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;