const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const CustomStrategy = require('passport-custom');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoDb = require('./db/mongo').db;
const bodyParser = require('body-parser');
const axios = require('axios');
const protobuf = require('protobufjs');
const protoParser = require('./lib/proto');
const { router, setPassport } = require('./routes');
const { googleClientID, googleClientSecret } = require('./env/key');
const User = mongoose.model('User');

var app = express();

var logger = (req, res, next) => {
  console.log(`${req.method} request received at ${req.url}`);
  next();
};
app.use(logger);
app.use(bodyParser.json());

// Static files immediately
app.use(express.static(__dirname + '/dist'));

// Initiate sessions after static files, save store writes
app.use(session({
  secret: 'this is not production grade code',
  store: new MongoStore({ mongooseConnection: mongoDb }),
  resave: false,
  saveUninitialized: false
}));

// Passport initialization
// Dummies until we fully implement login
passport.use(new GoogleStrategy({
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: 'http://localhost:3000/login/google/return',
  scope: ['profile']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ authId: profile.id }, (error, user) => {
      if (error) { return done(error); }
      if (user) { return user; }
      let newUser = new User({
        username: profile.displayName,
        authId: profile.id
      });
      return newUser.save();
    })
    .then((user) => done(null, user))
    .catch((error) => done(error, null));
  })
);

// This needs to account for whether or not the use is pressing sign-up
// Will have to add the user at signup then run passport authentication
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username }, (error, user) => {
      if (error) { return done(error); }
      if (user) { return user.comparePassword(password); } 
      return done('user not found', null);
    })
    .then((user) => done(null, user))
    .catch((error) => done(error, null));
  }
));

passport.use('mobile-oauth', new CustomStrategy(
  function(req, done) {
    let authId = req.query.auth_id;
    let username = req.query.display_name;
    User.findOne({ authId }, (error, user) => {
      if (error) { return done(error); }
      if (user) { return user; }
      let newUser = new User({
        username,
        authId
      });
      return newUser.save();
    })
    .then((user) => done(null, user))
    .catch((error) => done(error, null));
  }
));

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((_id, done) => 
  User.findById({ _id }).exec()
  .then((user) => done(null, user))
  .catch((error) => done(error, null))
);

app.use(passport.initialize());
app.use(passport.session());

setPassport(passport);

// Initialize routes
app.use('/', router);

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

var port = process.env.port || 3000;
app.listen(port, () => console.log(`now listening on ${port}`));
