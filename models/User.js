const mongoose = require('mongoose')

const {Schema} = mongoose

const userSchema = new Schema({
    id: String,
    name: String,
    username: String,
    about: String,
    photo: String,
    followers: Array
})

module.exports = mongoose.model('user', userSchema)