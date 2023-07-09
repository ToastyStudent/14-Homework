// Dependencies
const router = require('express').Router();

// Imports the various routes from the "api" directory and the "home-routes.js" and "dashboard-routes.js" files
const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

// Adds the prefix of `/` to all of the home routes imported from the "home-routes.js" file 
// Adds the prefix of `/dashboard` to all of the dashboard routes imported from the "dashboard-routes.js" file
// Adds the prefix of`/api` to all of the api routes imported from the "api" directory

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;
