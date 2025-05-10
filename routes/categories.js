const express = require("express");
// const Controller = require("../controllers/controller");
const UserController = require(".")
const router = express.Router();
const ControllerCategories = require('../controllers/controllerCategories')
const ControllerProducts = require('../controllers/controllerProducts')


const isLogin = function (req, res, next) {
    if (!req.session.user) {
        // req.session.redirectTo = req.originalUrl
        return res.redirect("/users/login?error=you must login first")
    }
    next()
}

const isAdmin = function (req, res, next) {

    if (req.session.user.role !== "admin") {
        return res.redirect(`/users/login?error=anda adalah ${req.session.user.role}, jadi tidak bisa add categories`)
    }

    next()
}


router.get("/", ControllerCategories.Categories)
router.get("/add", isLogin, isAdmin, ControllerCategories.getAdd)
router.post("/add", ControllerCategories.postAdd)
router.get("/:id", isLogin, ControllerProducts.Products) // See detail produk per category
router.get("/:id/delete", isLogin, isAdmin, ControllerCategories.deleteCategories)



module.exports = router