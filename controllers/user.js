const User = require('../models/user');
const Photo = require('../models/photo');

exports.likePhoto = function(req,res) {
  const {photoId} = req.body;  
  User.findById(req.params.userId)
  .then(function(user) {
    user.save(function (err) {
      if (err) return res.status(422).send({error: "User is not found"});
      console.log(photoId)
      user.likedPhotos.push(photoId);
      user.save().then(user => {
        res.send(user)
      })
    });
  })
  .catch(function(e) {
    res.send(e);
  })
}

exports.findUser = function(req,res) {
  const {userId} = req.params;
  User.findById(userId)
    .then(user => {
      res.send(user);
    })
}