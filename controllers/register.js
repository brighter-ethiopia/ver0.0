const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Users = require('../models/users')
require("dotenv").config();

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = (password) => {
    return password.match(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
    );
};

const register = async (req, res) => {
    const { name, email, password: normalpassword, phoneNumber } = req.body
    if (!name || !email || !normalpassword || !phoneNumber) return res.json({ status: 'error', error: 'Please fill all fields' })
    else {
        Users.find()
            .then(async (result) => {
                if (!validateEmail(email)) return res.json({ status: 'error', error: 'email not valid' })
                for (var i = 0; i < result.length; i++) {
                    if (result[i].email == email) {
                        return res.json({ status: 'error', error: 'email has already been registered' })
                    }
                }
                if (!validatePassword(normalpassword)) {
                    if (normalpassword.match("(?=.*?[#?!@$%^&*-])")) {
                        return res.json({ status: 'error', error: 'Password not valid <br /> Special characters not allowed!' })
                    } else if (!normalpassword.match(".{8,}")) {
                        return res.json({ status: 'error', error: 'Password not valid <br /> Must be atleast 8 characters long!' })
                    } else if (!normalpassword.match("(?=.*?[0-9])")) {
                        return res.json({ status: 'error', error: 'Password not valid <br /> Atleast 1 number required!' })
                    } else if (!normalpassword.match("(?=.*?[A-Z])")) {
                        return res.json({ status: 'error', error: 'Password not valid <br /> Atleast 1 uppercase letter required!' })
                    } else if (!normalpassword.match("(?=.*?[a-z])")) {
                        return res.json({ status: 'error', error: 'Password not valid <br /> Atleast 1 lowercase letter required!' })
                    }
                }
                if (phoneNumber.length != 10) return res.json({ status: 'error', error: 'Invalid phone number!' })
                const password = await bcrypt.hash(normalpassword, 10)
                const user = new Users({
                    name: name,
                    email: email,
                    password: password,
                    phoneNumber: phoneNumber,
                    userLoginCount: '0',
                    ads: "[]"
                })

                user.save()
                    .then((result) => {
                        console.log(result)
                        const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_EXPIRES
                        })
                        const cookieOption = {
                            expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        }
                        res.cookie('userRegistered', token, cookieOption)
                        Users.findById(result.id)
                            .then((result2) => {
                                Object.assign(result2, {
                                    "userLoginCount": "1"
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
                    })
                    .catch((err) => {
                        console.log(err)
                        return res.json({ status: 'error', error: err })
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = register;