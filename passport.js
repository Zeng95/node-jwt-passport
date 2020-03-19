//passport.js
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const User = require('./models/user')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, callback) => {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      try {
        const foundUser = await User.findOne({ email, password })

        if (!foundUser) {
          return callback(null, false, {
            message: 'Incorrect email or password'
          })
        }

        callback(null, foundUser, {
          message: 'Successfully logged in'
        })
      } catch (err) {
        callback(err)
      }
    }
  )
)

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.APP_JWT_SECRET
    },
    async (jwtPayload, callback) => {
      try {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        const foundUser = await User.findOneById(jwtPayload.id)

        callback(null, foundUser)
      } catch (err) {
        callback(err)
      }
    }
  )
)
