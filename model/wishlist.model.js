const mongoose = require('mongoose')

const wishlistSchema = mongoose.Schema({
    name: String,
    img: String,
    price: Number,
    user: String
}, {
    versionKey: false

})

const wishlistModel = mongoose.model('wishlists', wishlistSchema)

module.exports = {
    wishlistModel
}