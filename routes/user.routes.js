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
    const { email, firstname, lastname, password, roll, registerdate, avatar, gender } = req.body

    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            res.send({ "msg": "Already have an account please login" })

        } else {
            bcrypt.hash(password, 9, async (err, hash) => {
                if (err) {
                    res.send("Something went wrong")
                } else {
                    const user = new userModel({ roll, registerdate, avatar, gender, email, firstname, lastname, password: hash })
                    await user.save()
                    res.send({ "msg": "new user has been register" })
                }
            });
        }

    } catch (err) {
        console.log(err)
        res.send({ "msg": "Can't register" })
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
                    res.send({ "msg": "Login sucessful", token, email: user[0].email, firstname: user[0].firstname, lastname: user[0].lastname, role: user[0].role, registerdate: user[0].registerdate, avatar: user[0].avatar, gender: user[0].gender, isAuth: true })
                } else {
                    res.send({ "msg": "Wrong crediential", isAuth: false })
                }
            });
        } else {
            res.send({ "msg": "Wrong crediential", isAuth: false })
        }
    } catch (err) {
        res.send({ "msg": "Something Wrong", isAuth: false })
    }
})

userRoute.patch("/edit/:_id", async (req, res) => {
    try {
        let payload = req.body
        let _id = req.params._id
        await userModel.findByIdAndUpdate({ _id }, payload)
        res.send({ "msg": "Updated user" })
    } catch (err) {
        res.send('Err')
        console.log(err)
    }
})

userRoute.delete("/delete/:_id", async (req, res) => {
    try {
        let _id = req.params._id
        await userModel.findByIdAndDelete({ _id })
        res.send({"msg":"User has been delete"})
    } catch (err) {
        res.send('Err')
        console.log(err)
    }
})

module.exports = {
    userRoute
}