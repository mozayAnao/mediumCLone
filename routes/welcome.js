var express = require('express');
var router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
var user = require('../models/User');
var post = require('../models/Post')
let userProfile = null;

router.get('/', async function(req, res, next) {
  const userDB = await user.findOne({ id: userProfile.id }, 'id username name photo followers').exec();
  const postDB = await post.find({});
  const poster = await user.find({});
  // console.log(postDB)
  // console.log(poster)
  //console.log(userDB)
  res.render('welcome', {
    user: userDB,
    posts: postDB,
    poster: poster
  });
});

// =================Passport-Google router========================
router.get('/google',
  passport.authenticate('google', { scope: ['profile email https://www.googleapis.com/auth/plus.login'] }));

// ================Passport-gitHub router=========================
router.get('/git', 
  passport.authenticate('github')
  );

  // ================callbackURL====================
router.get('/auth', 
  passport.authenticate('github', { failureRedirect: '/welcome/loginFailed' }),
  function(req, res) {
    userProfile = req.user;
    //console.log(req.user)
    res.redirect('/welcome');
  });



module.exports = router;
