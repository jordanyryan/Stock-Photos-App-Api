const User = require('../models/user');
const Photo = require('../models/photo');

exports.likePhoto = function(req,res) {
  const {photoId} = req.body;  
  User.findByIdAndUpdate(req.params.userId, {$push: {likedPhotos: {url: photoId}}}, {new: true})
  .then(user => res.send(user))
  .catch(e => res.status(422).send(e));
}

exports.findUser = function(req,res) {
  const {userId} = req.params;
  User.findById(userId)
    .then(user => {
      res.send(user);
    })
    .catch(e => res.send(e));
}