const express = require('express')
const connection = require('./config/db')
var cors = require('cors')
const { userRoute } = require('./routes/user.routes')
const { productRoute } = require('./routes/products.routes')
const { authenticate } = require('./middleware/authenticate.middleware')
const { cartRoute } = require('./routes/cart.routes')
const { wishlistRoute } = require('./routes/wishlist.routes')
const { checkoutRoutes } = require('./routes/checkout.routes')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Welcome to our Manyavar Database")
})

app.use("/users", userRoute)
app.use("/products", productRoute)
app.use(authenticate)
app.use('/cart', cartRoute)
app.use('/wishlists', wishlistRoute)
app.use('/checkouts', checkoutRoutes)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log('Connected to db')
    } catch {
        console.log('Not connected to db')
    }
    console.log(`Server running at ${process.env.port}`)
})