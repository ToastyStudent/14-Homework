// Dependencies
const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

// Note: All of these routes require the user to be logged in; otherwise, the user will be redirected to the login page

// A GET route for the dashboard that renders the "all-posts-admin" handlebars template
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('all-posts-admin', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

// A GET route for the dashboard that renders the "new-post" handlebars template
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

// A GET route for the dashboard that renders the "edit-post" handlebars template based on the post id
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
