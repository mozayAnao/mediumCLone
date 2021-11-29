const mongoose = require('mongoose')

const {Schema} = mongoose

const commentSchema = new Schema({
    id: String,
    postId: String,
    userId: String,
    body: String
})

module.exports = mongoose.model('comment', commentSchema)