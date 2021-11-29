var express = require('express');
var router = express.Router();
const post = require('../models/Post');
const user = require('../models/User')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const postDB = await post.find({});
  const poster = await user.find({});
  console.log(postDB)
  console.log(poster)
  res.render('index', {
    posts: postDB,
    poster: poster
  });
});

module.exports = router;
