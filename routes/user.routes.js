const express = require("express")
const { userModel } = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const userRoute = express.Router()

userRoute.get("/", async (req, res) => {
    try {
        let usersdata = await userModel.find()
        res.send(usersdata)
    } catch (err) {
        res.send({ "msg": "Can't find users" })
    }
})

userRoute.post("/register", async (req, res) => {
    const { email, firstname, lastname, password, roll, registerdate, avatar, gender, mobile } = req.body

    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            res.send({ "msg": "Already have an account please login" })

        } else {
            bcrypt.hash(password, 9, async (err, hash) => {
                if (err) {
                    res.send("Something went wrong")
                } else {
                    const user = new userModel({ roll, registerdate, avatar, gender, email, mobile, firstname, lastname, password: hash })
                    await user.save()
                    res.send({ "msg": "new user has been register", "sucess": true })
                }
            });
        }

    } catch (err) {
        console.log(err)
        res.send({ "msg": "Can't register", "sucess": false })
    }
})

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, "manyavar")
                    res.send({ "msg": "Login sucessful", "sucess": true, token, user })
                } else {
                    res.send({ "msg": "Wrong crediential", "sucess": false })
                }
            });
        } else {
            res.send({ "msg": "Wrong crediential", "sucess": false })
        }
    } catch (err) {
        res.send({ "msg": "Something Wrong", "sucess": false })
    }
})

userRoute.patch("/edit/:_id", async (req, res) => {
    try {
        let payload = req.body
        let _id = req.params._id
        await userModel.findByIdAndUpdate({ _id }, payload)
        res.send({ "msg": "Updated user", "sucess": true })
    } catch (err) {
        res.send({ "msg": "Updated has not been updated", "sucess": false })
        console.log(err)
    }
})

userRoute.delete("/delete/:_id", async (req, res) => {
    try {
        let _id = req.params._id
        await userModel.findByIdAndDelete({ _id })
        res.send({ "msg": "User has been delete", "sucess": true })
    } catch (err) {
        res.send({ "msg": "User has not been delete", "sucess": false })
        console.log(err)
    }
})

module.exports = {
    userRoute
}