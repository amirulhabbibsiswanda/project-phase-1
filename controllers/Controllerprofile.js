const { Category, Product, UserProduct, User, Profile } = require('../models')
class ProfileController {
    static async profile(req, res) {
        try {
            const { id } = req.params
            const { userId } = req.session
            const { role } = req.session.user
            const { username } = req.session.user

            let data = await Profile.findOne({
                where: {
                    UserId: userId
                }
            })

            res.render('detailprofiles', { data, userId, username, role })

        } catch (error) {
            res.send(error)
        }
    }
    static async getAdd(req, res) {
        try {
            const { id } = req.params
            const { userId } = req.session
            const { role } = req.session.user
            const { username } = req.session.user

            res.render('editprofiles', { userId, role, username, id })


        } catch (error) {
            res.send(error)
        }
    }
    static async postAdd(req, res) {
        try {
            const { name, dateOfBirth, gender, address } = req.body
            const { userId } = req.session
            const { id } = req.params
            // console.log(id);
            // console.log(req.params);

            await Profile.create({
                name,
                dateOfBirth,
                address, gender, UserId: userId
            })
            res.redirect(`/profile/${id}`)
        } catch (error) {
            res.send(error)
        }
    }
}
module.exports = ProfileController