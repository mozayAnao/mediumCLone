var express = require('express');
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: './public/images/uploads/'})
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const post = require('../models/Post');
var router = express.Router();

/* POST new story. */
router.post('/', upload.single('avatar'), function(req, res, next) {
  if(!req.file) {
    const newPath = `/images/uploads/default.jpeg`;
    const $ = cheerio.load(req.body.body);
    const parsedBody = $('.ql-editor').html();
    console.log("the parsed html is: "+parsedBody);
    const addPost = new post({
      userId: req.body.userId,
      title: req.body.postTitle,
      body: parsedBody,
      photo: newPath,
      date: Date.now()
    });
    addPost.save(function(err) {
      if(err) return handleError(err);
      console.log('Saved')
      res.redirect('/welcome')
    })
  }else {
    const newPath = `public/images/uploads/${req.file.originalname}`;
    const path = `/images/uploads/${req.file.originalname}`;
    fs.rename(req.file.path, newPath, (err) => {
      if(err) console.log("error: "+ err);
      const $ = cheerio.load(req.body.body);
      const parsedBody = $('.ql-editor').html();
      const addPost = new post({
        userId: req.body.userId,
        title: req.body.postTitle,
        body: parsedBody,
        photo: path,
        date: Date.now()
      });
      addPost.save(function(err) {
        if(err) return handleError(err);
        console.log('Saved')
        res.redirect('/welcome')
      })
    
  })
  }
  
});

module.exports = router;
