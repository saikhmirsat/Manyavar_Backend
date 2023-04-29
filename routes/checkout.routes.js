const express = require('express')
const { cartModel } = require('../model/cart.model')
const { checkoutModel } = require('../model/checkout.model')

const checkoutRoutes = express.Router()

checkoutRoutes.get('/', async (req, res) => {
    try {
        const checkoutProducts = await checkoutModel.find()
        res.send(checkoutProducts)
    } catch (err) {
        console.log(err)
        res.send({ "msg": "Something went wrong", "sucess": false })
    }
})

checkoutRoutes.post('/addcheckout/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const userCart = await cartModel.findOne({ _id })
        const { address, payment, user } = req.body

        const checkoutObj = {
            img: userCart.img,
            name: userCart.name,
            color: userCart.color,
            size: userCart.size,
            quantity: userCart.quentity,
            price: userCart.price,
            payment,
            address,
            user
        }

        const checkoutProduct = new checkoutModel(checkoutObj)
        await checkoutProduct.save()

        await cartModel.findByIdAndDelete({ _id })

        res.send({ "msg": "Checkout successful", "sucess": true })
    } catch (err) {
        console.log(err)
        res.send({ "msg": "Checkout faild", "sucess": false })
    }
})


checkoutRoutes.get('/usercheckout', async (req, res) => {
    try {
        const { user } = req.body
        const userCheckoutList = await checkoutModel.find({ user })
        res.send(userCheckoutList)
    } catch (err) {
        console.log(err)
        res.send({ "msg": "Checkout faild", "sucess": false })
    }
})

module.exports = {
    checkoutRoutes
}