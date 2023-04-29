const mongoose = require('mongoose')

const checkoutSchema = mongoose.Schema({
    img: String,
    name: String,
    color: String,
    size: String,
    quantity: Number,
    price: Number,
    payment: String,
    address: String,
    user: String
}, {
    versionKey: false
})

const checkoutModel = mongoose.model('checkouts', checkoutSchema)

module.exports = {
    checkoutModel
}