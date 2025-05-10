const express = require("express");
const Controllerprofile = require("../controllers/Controllerprofile")
const router = express.Router();
const isLogin = function (req, res, next) {
    if (!req.session.user) {
        req.session.redirectTo = req.originalUrl
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

router.get('/:id/add',Controllerprofile.getAdd)
router.post('/:id/add',Controllerprofile.postAdd)
router.get('/:id',Controllerprofile.profile)

module.exports = router