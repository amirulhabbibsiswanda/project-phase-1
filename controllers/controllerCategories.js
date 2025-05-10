const { Category, Product, UserProduct, User, Profile } = require('../models')
class Controller {
    static async Categories(req, res) {
        try {
            let paymentMessage = req.query.message
            // const{role} = req.session.user
            // const{username}= req.session.user
            // const{userId} = req.session
            const username = req.session.user?.username
            const userId = req.session.userId
            const role = req.session.user?.role

            let data = await Category.findAll({
                include: Product
            })


            // console.log("DATA CATEGORY:", data);
            res.render('categories', { data, userId, username, role, paymentMessage })
        } catch (error) {
            res.send(error)
        }
    }
    static async getAdd(req, res) {
        try {
            const { userId } = req.session
            const { role } = req.session.user
            const { username } = req.session.user


            let data = await Category.findAll()

            res.render('addcategories', { data, userId, username, role })

        } catch (error) {
            res.send(error)
        }
    }
    static async postAdd(req, res) {
        try {
            const { name, urlImage } = req.body

            await Category.create({
                name,
                urlImage
            })
            res.redirect('/categories')

        } catch (error) {
            res.send(error)
        }
    }
    static async deleteCategories(req, res) {
        try {
            const { id } = req.params
            await Category.destroy({
                where: {
                    id
                }
            })
            res.redirect('/categories')
        } catch (error) {
            res.send(error)
        }
    }
}
module.exports = Controller