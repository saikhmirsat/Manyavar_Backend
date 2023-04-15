const express = require('express')
const { productModel } = require('../model/product.model')


const productRoute = express.Router()

productRoute.get("/", async (req, res) => {
    const { q, limit, skip, sort, order, category, gender, color, size, occasion, collections } = req.query

    const query = { description: { $regex: q, $options: "i" } }

    let filter = {}

    if (gender) {
        filter.gender = gender
    }
    if (category) {
        filter.category = category
    }
    if (size) {
        filter.size = size
    }
    if (color) {
        filter.color = color
    }
    if (occasion) {
        filter.occasion = occasion
    }
    if (collections) {
        filter.collections = collections
    }


    let y = {}
    if (sort == 'price') {
        y = { price: order }
    } else if (sort == 'name') {
        y = { name: order }
    }


    let actualFilter = {}
    for (let key in filter) {
        if (filter[key] !== '') {
            actualFilter[key] = filter[key]
        }
    }

    if (actualFilter.size) {
        actualFilter.size = { $in: [size] }
    }

    if (q) {
        actualFilter = query
    }

    try {
        let data = await productModel.find(actualFilter).sort(y).limit(limit).skip(skip)
        res.send(data)

    } catch (err) {
        res.send("Can't find product")
        console.log(err)
    }
})
productRoute.get("/:_id", async (req, res) => {
    try {
        const Product = await productModel.find({ _id: req.params })
        res.send(Product)
    } catch (err) {
        res.send({ "msg": "Can not found", "sucess": false })
        console.log(err)
    }
})

productRoute.post("/add", async (req, res) => {
    try {
        const data = new productModel(req.body)
        await data.save()
        res.send({ msg: "Product has been added successfully", "sucess": true })
    } catch (err) {
        res.send({ msg: "Not added", "sucess": false })
        console.log(err)
    }
})

productRoute.patch("/update/:_id", async (req, res) => {
    try {
        const _id = req.params._id
        const payload = req.body
        await productModel.findByIdAndUpdate({ _id }, payload)
        res.send({ msg: "Product has been updated successfully", "sucess": true })
    } catch (err) {
        res.send({ msg: "Not updated", "sucess": false })
        console.log(err)
    }
})

productRoute.delete("/delete/:_id", async (req, res) => {
    try {
        const _id = req.params._id
        await productModel.findByIdAndDelete({ _id })
        res.send({ msg: "Product has been deleted successfully", "sucess": true })
    } catch (err) {
        res.send({ msg: "Not deleted", "sucess": false })
        console.log(err)
    }
})

module.exports = {
    productRoute
}