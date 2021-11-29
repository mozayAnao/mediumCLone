var express = require('express');
var router = express.Router();
const post = require('../models/Post');
const user = require('../models/User')

/* GET home page. */
router.get('/:postId', async function(req, res, next) {
    const postDB = await post.findOne({ _id: req.params.postId }, 'userId title body photo likes date').exec();
    const userDB = await user.findOne({ id: postDB.userId }, 'id username name photo followers').exec();
    res.render('read', {
        post: postDB,
        user: userDB
    })
});

module.exports = router;
