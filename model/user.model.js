const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    role: String,
    gender: String,
    email: String,
    registerdate: String,
    firstname: String,
    lastname: String,
    password: String,
    avatar: String,
    mobile: String
}, {
    versionKey: false
})

const userModel = mongoose.model("users", userSchema)

module.exports = {
    userModel
}