
const bcrypt = require("bcryptjs")
const session = require("express-session")
const { Category, Product, UserProduct, User, Profile } = require('../models')
const formatRupiah = require('../helpers/formatRupiah')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


class UserController {
    static async register(req, res) {
        try {
            let error = req.query.error
            if (error) {
                error = error.split(',')
            }
            else {
                error = []
            }
            res.render("users/register", { error })

        } catch (error) {
            res.send(error)
        }
    }

    static async postRegister(req, res) {
        try {
            let { username, password, role } = req.body
            await User.create({
                username,
                password,
                role
            })

            res.redirect("/users/login")

        } catch (error) {
            // console.log(error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                let justError = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/users/register?error=${justError}`)
            }
            else {
                res.send(error)
            }
        }
    }

    static async login(req, res) {
        try {
            // console.log(req.session.user, "req session di form login");

            let error = ""
            if (req.query) {
                error = req.query.error
            }
            res.render("users/login", { error })

        } catch (error) {
            res.send(error)
        }
    }
    static async postLogin(req, res) {
        try {
            // console.log(req.session, "jika case ada akun");
            let { username, password } = req.body
            let data = await User.findOne({
                where: {
                    username: username
                }
            })
            // console.log(data);
            // console.log(req.session, "ini req session user");
            if (data) {
                let isValidPassword = await bcrypt.compare(password, data.password)
                if (isValidPassword) {

                    // const redirectTo = req.session.redirectTo || "/";
                    // delete req.session.redirectTo
                    // console.log(redirectTo, "path yang akan dituju setelah login");
                    req.session.userId = data.id
                    req.session.user = {
                        username,
                        role: data.role
                    }
                    // req.session.user = { username }

                    return res.redirect(`/categories`)
                } else {
                    return res.redirect("/users/login?error=invalid password")
                }
            } else {
                return res.redirect("/users/login?error=username not found")
            }

            // bcrypt.compareSync("B4c0/\/", hash); //sync
        } catch (error) {
            res.send(error)
        }
    }
    static async cart(req, res) {
        try {

            const { userId } = req.session
            const { username } = req.session.user
            const { role } = req.session.user
            let data = await Product.findAll({
                include: [{
                    model: User,
                    where: {
                        id: userId
                    },
                    through: {
                        attributes: []
                    },
                },
                {
                    model: Category
                }]
            })

            res.render('cart', { data, userId, username, formatRupiah, role })

        } catch (error) {
            res.send(error)
        }
    }
    static async logout(req, res) {
        try {
            req.session.destroy(
                res.redirect("/")
            )
        } catch (error) {
            res.send(error)
        }
    }
    static async addCart(req, res) {
        try {
            const { id } = req.params
            const { userId } = req.session
            await UserProduct.create({
                UserId: userId,
                ProductId: id,

            })

            res.render('checkout_redirect', { id })
            // res.redirect(`/users/checkout/${id}`)
            // res.redirect('/products')


        } catch (error) {
            res.send(error)
        }
    }
    static async checkout(req, res) {
        try {
            const { productId } = req.params
            const product = await Product.findByPk(productId)
            // console.log(req.session, "CARI");


            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'idr',
                        product_data: {
                            name: product.title,
                            description: product.description
                        },
                        unit_amount: product.price * 100, // dalam sen
                    },
                    quantity: 1
                }],
                mode: 'payment',
                success_url: `http://localhost:3000/categories?message=pembayaran+berhasil`,
                cancel_url: `http://localhost:3000/categories?message=pembayaran+dibatalkan`,
            })

            res.redirect(session.url)
        } catch (error) {
            res.send(error)
        }
    }

}

module.exports = UserController