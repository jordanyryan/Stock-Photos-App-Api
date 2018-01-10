const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define model
const userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String
});


// Create Model Class
const ModelClass = mongoose.model('user', userSchema);
// Export model

module.exports = ModelClass;