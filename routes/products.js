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
        return res.redirect(`/users/login?error=anda adalah ${req.session.user.role}, jadi tidak bisa add product`)
    }

    next()
}

router.get("/", isLogin, ControllerProducts.showAllProducts)
router.get("/add", isLogin, isAdmin, ControllerProducts.getAdd)
router.post("/add", ControllerProducts.postAdd)
router.get("/:id/edit", isLogin, isAdmin, ControllerProducts.getEdit)
router.post("/:id/edit", ControllerProducts.postEdit)



module.exports = router