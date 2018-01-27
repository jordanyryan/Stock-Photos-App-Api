const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


// Create Local Strategy
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password, call done with the user
  // If it is the correct email and password
  // otherwise call done with false
  User.findOne({email: email}, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);

    // Compare password to user.password
  })

});

// Setup options for JWT strategy

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
// See if user id in payload exists in DB,
// if it does call done in our DB
// Otherwise call done w/o user object
User.findById(payload.sub, function(err, user) {
  if (err) return done(err, false);

  if(user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

});

// Tell passport to use this strategy
passport.use(jwtLogin);