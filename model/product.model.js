const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: String,
    category: String,
    gender: String,
    occasion: String,
    collections: String,
    size: Array,
    price: Number,
    quentity: Number,
    color: String,
    features: Array,
    description: String,
    address: String,
    email: String
}, {
    versionKey: false
})

const productModel = mongoose.model("products", productSchema)

module.exports = {
    productModel
}

