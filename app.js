require('dotenv').config()
const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const app = express()
const port = 3000
const ControllerCategories = require('./controllers/controllerCategories')
const ControllerProducts = require('./controllers/controllerProducts')
const router = require("./routes")
const session = require('express-session')
app.use(session({
    secret: 'ini session',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: true
    }
}))


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
    console.log('running into port', port);

})

app.use("/", router)

// app.get('/categories', ControllerCategories.Categories)
// app.get('/products', ControllerProducts.showAllProducts)

// app.get('/categories/add', ControllerCategories.getAdd)
// app.get('/products/add', ControllerProducts.getAdd)
// app.post('/products/add', ControllerProducts.postAdd)
// app.post('/categories/add', ControllerCategories.postAdd)
// app.get('/categories/:id', ControllerProducts.Products)
// app.get('/products/:id/edit', ControllerProducts.getEdit)
// app.post('/products/:id/edit', ControllerProducts.postEdit)
// app.get('/categories/:id/delete', ControllerCategories.deleteCategories)