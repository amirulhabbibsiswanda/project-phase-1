const express = require("express");

const UserController = require("../controllers/controllerUsers");
const Controller = require("../controllers/controllerCategories");
const router = express.Router();
const isLogin = function (req, res, next) {
    if (!req.session.user) {
        // req.session.redirectTo = req.originalUrl
        return res.redirect("/users/login?error=you must login first")
    }
    next()
}
const isCustomer = function (req, res, next) {

    if (req.session.user.role !== "customer") {
        return res.send(`anda bukan customer`)
    }

    next()
}


router.get("/register", UserController.register)
router.post("/register", UserController.postRegister)
router.get("/login", UserController.login)
router.post("/login", UserController.postLogin)
router.get('/cart/:id', isLogin, isCustomer, UserController.cart)
router.get('/userproducts/:id/add', isLogin, isCustomer, UserController.addCart)
router.get('/checkout/:productId', isLogin, isCustomer, UserController.checkout)
router.get("/confirmation", UserController.confirmation)
router.get("/paymentsuccess", UserController.paymentSuccess)
router.get("/cancelpayment", UserController.cancelPayment)
router.get("/logout", UserController.logout)

module.exports = router