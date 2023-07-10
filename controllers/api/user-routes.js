// Dependencies
const router = require('express').Router();
const { User } = require('../../models');

// A POST route for creating a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// A POST route for logging in a user that fails if the correct credentials are not provided 
// (i.e., the user does not already exist or the password is incorrect)
// Note how each of the error messages are the same despite the different scenarios; this is to ensure bad actors 
// cannot use the error messages to determine if a user exists in the database or not and thus attempt to guess said user's password
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    // Error message if the user does not exist
    if (!user) {
      res.status(400).json({ message: 'No User Account found with these credentials!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    // Error message if the password is incorrect
    if (!validPassword) {
      res.status(400).json({ message: 'No User Account found with these credentials!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now succesfully logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No User Account found with these credentials!' });
  }
});

// A POST route for logging out a user that fails if the user is not logged in
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
