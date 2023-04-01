const express = require('express')
const connection = require('./config/db')
const { userRoute } = require('./routes/user.routes')
const { productRoute } = require('./routes/products.routes')
require('dotenv').config()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Welcome to our Manyavar Database")
})

app.use("/users", userRoute)
app.use("/products", productRoute)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log('Connected to db')
    } catch {
        console.log('Not connected to db')
    }
    console.log(`Server running at ${process.env.port}`)
})