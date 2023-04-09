const express = require('express')
const { cartModel } = require('../model/cart.model')

const cartRoute = express.Router()

cartRoute.get('/', async (req, res) => {
    try {
        const carts = await cartModel.find()
        res.send(carts)
    } catch (e) {
        res.send({ 'msg': 'Error' })
    }
})

cartRoute.get('/usercart', async (req, res) => {
    try {
        let { user } = req.body
        const carts = await cartModel.find({ user })
        res.send(carts)
    } catch (e) {
        res.send({ 'msg': 'Error' })
    }
})

cartRoute.post('/add', async (req, res) => {
    try {
        const cart = new cartModel(req.body)
        await cart.save()
        res.send({ 'msg': 'Product has been added' })
    } catch (e) {
        res.send('err')
    }
})
cartRoute.patch('/edit/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const { name, img, price, quentity, size } = req.body
        let payload = { name, img, price, quentity, size }
        await cartModel.findByIdAndUpdate({ _id }, payload)
        res.send({ 'msg': 'Product has been update' })
    } catch (e) {
        res.send('err')
    }
})
cartRoute.delete('/delete/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        await cartModel.findByIdAndDelete({ _id })
        res.send({ 'msg': 'Product has been deleted' })
    } catch (e) {
        res.send('err')
    }
})



module.exports = {
    cartRoute
}