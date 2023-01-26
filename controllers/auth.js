const express = require('express')
const register = require('./register')
const login = require('./login')
const server = require('./server')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/server', server)

module.exports = router;