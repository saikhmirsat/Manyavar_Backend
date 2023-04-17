const express = require('express')
const { wishlistModel } = require('../model/wishlist.model')
const { cartModel } = require('../model/cart.model')

const wishlistRoute = express.Router()

wishlistRoute.get('/', async (req, res) => {
    try {
        const wishLists = await wishlistModel.find()
        res.send(wishLists)
    } catch (err) {
        res.send({ 'msg': 'Not added into wishlist', 'success': false })
        console.log(err)
    }
})

wishlistRoute.get('/userwishlist', async (req, res) => {
    try {
        const user = req.body.user
        const wishLists = await wishlistModel.find({ user })
        res.send(wishLists)
    } catch (err) {
        res.send({ 'msg': 'Not Found', 'success': false })
        console.log(err)
    }
})

wishlistRoute.post('/add', async (req, res) => {
    try {
        const wishList = new wishlistModel(req.body)
        await wishList.save()
        res.send({ 'msg': 'Added into wishlist', 'success': true })
    } catch (err) {
        res.send({ 'msg': 'Not added into wishlist', 'success': false })
        console.log(err)
    }
})

wishlistRoute.post('/movetocart/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const { size, quentity } = req.body
        const { name, img, price, user, color } = await wishlistModel.findOne({ _id })
        let obj = { name, img, price, size, quentity, user, color }

        let newcart = await cartModel(obj)
        await newcart.save()

        await wishlistModel.findByIdAndDelete({ _id })

        res.send({ 'msg': 'Move into cart', 'success': true })
    } catch (err) {
        res.send({ 'msg': 'Not move into cart', 'success': false })
    }
})

wishlistRoute.delete('/delete/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        await wishlistModel.findByIdAndDelete({ _id })
        res.send({ 'msg': 'Product has been deleted from wishlist', 'success': true })
    } catch (err) {
        res.send({ 'msg': 'Product has not been deleted from wishlist', 'success': false })
    }
})

module.exports = {
    wishlistRoute
}
