const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp}, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had email and password authenticated
  // Just need to give them a token
  res.send({token: tokenForUser(req.user)});
}

exports.signup = function(req,res,next) {
  const {email, password, firstName, lastName} = req.body;

  //See if a user with given email exists
  User.findOne({email}, function(e, existingUser) {
    if(e) { return next(e) }

    if(!email || !password) return res.status(422).send({error: "You must provide email and password"});
    if(!firstName) return res.status(422).send({error: "You must provide a first name"});
    if(!lastName) return res.status(422).send({error: "You must provide a last name"});

  // if email exists, return error
    if(existingUser) return res.status(422).send({error: "Email is in use"});

  // if email does not exist, create and save record
    const user = new User({email, password, firstName, lastName})

    user.save(function(err) {
      if(err) {return next(err);}
    });
  // respond with successful user creation
    res.json({token: tokenForUser(user)});
  });
}

exports.findUser = function(req, res) {
  User.findById(req.params.userId)
  .then(function({firstName, lastName, likedPhotos}) {
    res.json({firstName, lastName, likedPhotos});
  })
  .catch(function(e) {
    res.send(e);
  })
}