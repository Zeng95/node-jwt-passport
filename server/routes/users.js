const express = require('express')
const router = express()

const controller = require('../controllers/users')

router.get('/users', controller.getUsers)
router.get('/users/profile', controller.getUserProfile)

module.exports = router
