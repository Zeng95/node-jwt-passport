const express = require('express')
const router = express()

const controller = require('../controllers/auth')

router.post('/auth/login', controller.login)

module.exports = router
