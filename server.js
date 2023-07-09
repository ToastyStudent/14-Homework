// Import Dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

// Set up the Express Application
const app = express();
const PORT = process.env.PORT || 3001;

// Import Sequelize Connection
const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Set up the Session and Cookies
const sess = {
  secret: 'Very secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Set up the Handlebars.js Helpers
const hbs = exphbs.create({ helpers });

// Set up the Handlebars.js Engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up the Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the Routes written in the Controllers folder
app.use(require('./controllers/'));

// Esablish a Connection to the Database and Sequelize Server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});
