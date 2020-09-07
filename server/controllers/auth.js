const passport = require('passport')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {}

exports.register = (req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
    console.log(err, user, info)
  })(req, res, next)
}
