const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Users = require('../models/users')
require("dotenv").config();

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ status: 'error', error: 'Please enter your email and password' })
    else {
        Users.find({ "email": email })
            .then(async (result) => {
                if (result.length > 0) {
                    if (!await bcrypt.compare(password, result[0].password)) {
                        return res.json({ status: 'error', error: 'Incorrect email or password' })
                    } else {
                        const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_EXPIRES
                        })
                        const cookieOption = {
                            expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        }
                        res.cookie('userRegistered', token, cookieOption)
                        const currentUserLoginCount = result[0].userLoginCount
                        Users.findById(result[0].id)
                            .then((result2) => {
                                Object.assign(result2, {
                                    "userLoginCount": currentUserLoginCount + 1
                                })
                                result2.save()
                                    .then((result2) => {
                                        console.log('user ' + email + ' logged in')
                                        return res.json({ status: 'success', success: 'User has been logged In' })
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                } else {
                    return res.json({ status: 'error', error: 'Incorrect email or password' })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = login;