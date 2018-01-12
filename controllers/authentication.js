const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp}, config.secret);
}


exports.signup = function(req,res,next) {
  const {email, password} = req.body;

  //See if a user with given email exists
  User.findOne({email}, function(e, existingUser) {
    if(e) { return next(err) }

    if(!email || !password) return res.status(422).send({error: "You must provide email and password"});

  // if email exists, return error
    if(existingUser) return res.status(422).send({error: "Email is in use"});

  // if email does not exist, create and save record
    const user = new User({email, password})

    user.save(function(err) {
      if(err) {return next(err);}
    });
  // respond with successful user creation
    res.json({token: tokenForUser(user)});
  });


}