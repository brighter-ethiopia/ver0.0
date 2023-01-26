const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ads_Schema = new Schema({
    ads: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Ads = mongoose.model('ads', ads_Schema)

module.exports = Ads;