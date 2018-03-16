const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// Define model
const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: {type: String, unique: true, lowercase: true},
  password: String,
  firstName: String,
  lastName: String,
  likedPhotos: [{ type: Schema.Types.ObjectId, ref: 'photo'}],
});

// On save hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
  // get access to user model
  // user is an instance of the User model
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    // hash (encrypt) password using salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);

      //overwrite plain text password with encrypted password
      user.password = hash;
      next();
    })
  })
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  })
}

// Create Model Class
const ModelClass = mongoose.model('user', userSchema);
// Export model

module.exports = ModelClass;