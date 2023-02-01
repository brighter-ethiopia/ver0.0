'use strict';
const express = require('express')
const https = require('https')
const fs = require('fs')

const domain = 'advancedts.cf'

const mongoose = require('mongoose')
const dbURI = 'mongodb+srv://brighterEthiopiaOrg:2023beoX!@cluster0.vxpk3ee.mongodb.net/?retryWrites=true&w=majority'

const app = express()

app.use(function (req, res) {
    res.redirect('https://' + domain + req.originalUrl);
});
app.listen(80);

var appSecure = express();

appSecure.use('/js', express.static(__dirname + '/public/js'))
appSecure.use('/css', express.static(__dirname + '/public/css'))
appSecure.use('/img', express.static(__dirname + '/img'))
appSecure.set('view engine', 'ejs')
appSecure.set('views', './views')
appSecure.use(express.json({ limit: '50mb' }));

appSecure.use('/', require('./routes/pages'))
appSecure.use('/api', require('./controllers/auth'))

var options = {
    key: fs.readFileSync('/opt/bitnami/letsencrypt/certificates/advancedts.cf.key'),
    cert: fs.readFileSync('/opt/bitnami/letsencrypt/certificates/advancedts.cf.crt'),
};

https.createServer(options, appSecure).listen(443, function () {
    console.log('HTTPS listening on port 443');
});


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to mongo db')
    })
    .catch((err) => console.log(err))