'use strict';
const express = require('express')
const https = require('https')
const app = express()
const fs = require('fs')
const path = require('path')
const cookie = require('cookie-parser')
const PORT = 8000

const mongoose = require('mongoose')
const dbURI= 'mongodb+srv://brighterEthiopiaOrg:2023beoX!@cluster0.vxpk3ee.mongodb.net/?retryWrites=true&w=majority'

app.use('/js', express.static(__dirname + '/public/js'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/img', express.static(__dirname + '/img'))
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(cookie())
app.use(express.json({ limit: '50mb' }));

app.use('/', require('./routes/pages'))
app.use('/api', require('./controllers/auth'))

/* const httpsOptions = {
	cert: fs.readFileSync(path.join(__dirname, '..', '..', 'conf', 'thryfts.cf.crt')), 
	key: fs.readFileSync(path.join(__dirname, '..', '..', 'conf', 'thryfts.cf.key'))
}

https.createServer(httpsOptions, app)
	.listen(PORT, function () {
		console.log(`server up on PORT ${PORT}`)
	}) */

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to mongo db')
    })
    .catch((err) => console.log(err))
