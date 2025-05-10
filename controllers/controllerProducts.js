const { Category, Product, UserProduct, User, Profile } = require('../models')
const { Op } = require('sequelize')
const formatRupiah = require('../helpers/formatRupiah')
class Controller {
    static async Products(req, res) {
        try {
            const { id } = req.params
            const{username}= req.session.user
            const{role} = req.session.user
            const{userId} = req.session

            let data = await Product.findAll({
                where: {
                    CategoryId: {
                        [Op.eq]: id
                    }
                }
            })
            res.render('products', { data,formatRupiah,userId,username,role})

        } catch (error) {
            res.send(error)
        }
    }
    static async getAdd(req, res) {
        try {
            const{username}= req.session.user
            const{role} = req.session.user
            const{userId} = req.session
            let error = req.query.error
            if(error){
                error = error.split(',')
            }
            else{
                error = []
            }

            let data = await Category.findAll()
            res.render('addproducts', { data,userId,username ,role,error})

        } catch (error) {
            res.send(error)
        }
    }
    static async postAdd(req, res) {
        try {
            const { title, price, url, CategoryId, description } = req.body
            let converturl = await Product.convertUrl(url)
            await Product.create({
                title,
                price,
                url:converturl,
                CategoryId,
                description
            })

            res.redirect(`/categories/${CategoryId}`)
        } catch (error) {
            if(error.name === 'SequelizeValidationError'){
                let justError = error.errors.map(el=>{
                    return el.message
                })
                res.redirect(`/products/add?error=${justError}`)
            }
            else{
                res.send(error)
            }
        }
    }
    static async showAllProducts(req, res) {
        try {
            
             let data = await Product.findAll()
            // console.log(req.session, "=====");
            const{search} = req.query
            if(search){
                data = await Product.findAll({
                    where :{
                        title:{
                        [Op.iLike] : `%${search}%`
                        }
                    }
                })
                
            }
            const{userId} = req.session
            const{role} = req.session.user
            const{username}= req.session.user

            res.render('allproducts', { data,formatRupiah,userId,username,role }) // navbar produk

        } catch (error) {
            res.send(error)
        }
    }
    static async getEdit(req, res) {
        try {
            const{userId} = req.session
            const{username}= req.session.user
            const{role} = req.session.user
            const { id } = req.params
            let error = req.query.error
            if(error){
                error = error.split(',')
            }
            else{
                error = []
            }
            let datacategories = await Category.findAll()
            let data = await Product.findAll({
                where: {
                    id
                }
            })
            // console.log(data);

            res.render('editproducts', { data, id, datacategories ,userId,username,role,error})

        } catch (error) {
            res.send(error)
        }
    }
    static async postEdit(req, res) {
        try {
            const { id } = req.params
            const { title, price, url, description, CategoryId } = req.body

            await Product.update({
                title, price, url, description, CategoryId
            }, {
                where: {
                    id
                }
            })
            res.redirect('/products')
        } catch (error) {
            const { id } = req.params

            if(error.name === 'SequelizeValidationError'){
                let justError = error.errors.map(el=>{
                    return el.message
                })
                res.redirect(`/products/${id}/edit?error=${justError}`)
            }
            else{
                res.send(error)
            }
        }
    }
}
module.exports = Controller