const Controller = require("../controllers/controller")
// const UserController = require("../controllers/userController")
const express = require("express");
const router = express.Router();
const routerUsers = require("./users")
const routerCategories = require("./categories")
const routerProducts = require("./products")
const routerProfile = require('./profiles')


router.get("/", (req, res) => {
    res.redirect("/categories")
})

router.use("/categories", routerCategories)
router.use("/products", routerProducts)
router.use("/users", routerUsers)
router.use('/profile',routerProfile)

// router.get("/", Controller.home)
// router.get("/daftarproduk", isLogin, Controller.daftarProduk)
// router.use("/users", routerUsers)

module.exports = router
