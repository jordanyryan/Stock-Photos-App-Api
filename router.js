const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app) {
  app.get('/', requireAuth  , function(req, res) {
    res.send({message: "secret message is SUPERSECRET"});
  })

  app.get('/users/:userId', Authentication.findUser)

  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup)
}