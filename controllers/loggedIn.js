const jwt = require('jsonwebtoken')
const Users = require('../models/users')

const loggedIn = (req, res, next) => {
    if (!req.cookies.userRegistered) return next()
    try {
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET)
        Users.find({ "_id": decoded.id })
            .then(async (result) => {
                req.user = result[0]
                return next()
            })
            .catch((err) => {
                console.log(err)
                return next()
            })
    } catch (err) {
        if (err) return next()
    }
}
module.exports = loggedIn;
