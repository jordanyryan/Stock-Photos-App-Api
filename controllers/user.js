const User = require('../models/user');
const Photo = require('../models/photo');

exports.likePhoto = function(req,res) {
  const {url} = req.body;
  console.log(User.find({}))
  
  User.findById(req.params.userId)
  .then(function(user) {
    user.save(function (err) {
      if (err) return res.status(422).send({error: "User is not found"});

      const photo = new Photo({
        url
      });
      photo.fans.push(user);
      user.likedPhotos.push(photo);

      photo.save(function (err) {
        if (err) return res.status(422).send({error: "Photo could not be found"});
      });
      user.save();
      res.send(photo)
    });
  })
  .catch(function(e) {
    res.send(e);
  })
}



// User.findById(req.params.userId)
// .then(function({firstName, lastName, likedPhotos}) {
//   res.json({firstName, lastName, likedPhotos});
// })
// .catch(function(e) {
//   res.send(e);
// })