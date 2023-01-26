const express = require('express')
const loggedIn = require('../controllers/loggedIn')
const logout = require('../controllers/logout')
const router = express.Router()

router.get('/', loggedIn, (req, res) => {
    if (req.user) {
        res.render('home', {status: 'loggedIn', user: req.user})
    } else {
        res.render('index', {status: 'no', user: 'nothing'})
    }
})

router.get('/register', (req, res) => {
    res.sendFile('register.html', {root: './public'})
})

router.get('/login', (req, res) => {
    res.sendFile('login.html', {root: './public'})
})

/* router.get('/logout', logout) */

router.get('/home', loggedIn, (req, res) => {
    if (req.user) {
        res.render('home', {status: 'loggedIn', user: req.user})
    } else {
        res.render('index', {status: 'no', user: 'nothing'})
    }
})

router.get('/projects', loggedIn, (req, res) => {
    if (req.user) {
        res.render('user/projects', {status: 'loggedIn', user: req.user})
    } else {
        res.render('projects', {status: 'no', user: 'nothing'})
    }
})

router.get('/about', loggedIn, (req, res) => {
    if (req.user) {
        res.render('user/about', {status: 'loggedIn', user: req.user})
    } else {
        res.render('about', {status: 'no', user: 'nothing'})
    }
})

router.get('/donate', loggedIn, (req, res) => {
    if (req.user) {
        res.render('donate', {status: 'loggedIn', user: req.user})
    } else {
        res.render('donate', {status: 'no', user: 'nothing'})
    }
})

module.exports = router;