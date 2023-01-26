const mongoose = require('mongoose')
const Schema = mongoose.Schema

const users_Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    userLoginCount: {
        type: Number,
        required: true
    }, 
    favoriteAds: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Users = mongoose.model('users', users_Schema)

module.exports = Users;