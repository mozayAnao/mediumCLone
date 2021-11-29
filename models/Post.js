const mongoose = require('mongoose')

const {Schema} = mongoose

const postSchema = new Schema({
    id: String,
    userId: String,
    title: String,
    body: String,
    photo: String,
    likes: Array,
    category: String,
    date: Date
})

module.exports = mongoose.model('post', postSchema)