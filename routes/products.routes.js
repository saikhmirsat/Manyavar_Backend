const express = require('express')
const { productModel } = require('../model/product.model')


const productRoute = express.Router()

productRoute.get("/", async (req, res) => {
    try {
        const Products = await productModel.find()
        res.send(Products)
    } catch (err) {
        res.send('Can not found')
        console.log(err)
    }
})
productRoute.get("/:_id", async (req, res) => {
    try {
        const Product = await productModel.find({ _id: req.params })
        res.send(Product)
    } catch (err) {
        res.send('Can not found')
        console.log(err)
    }
})

productRoute.post("/add", async (req, res) => {
    try {
        const data = new productModel(req.body)
        await data.save()
        res.send({ msg: 'Product has been added successfully' })
    } catch (err) {
        res.send({ msg: 'Not added' })
        console.log(err)
    }
})

module.exports = {
    productRoute
}