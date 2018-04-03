const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  fans: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  author: { type: Schema.Types.ObjectId, ref: 'user' }
})

const PhotoClass = mongoose.model('photo', photoSchema);

module.exports = PhotoClass;