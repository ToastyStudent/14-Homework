// Javascript used for authentication
// Id user is not logged in, redirect to login page
const withAuth = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
