//passport.js
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const User = require('../models/user')

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    async (email, password, done) => {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      try {
        const newUser = new User({ email, password })
        const foundUser = await User.findOne({ email })

        if (foundUser) {
          return done(null, false, {
            message: 'Email has been already taken'
          })
        }

        await newUser.save()

        done(null, newUser)
      } catch (err) {
        done(err)
      }
    }
  )
)

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    async (email, password, done) => {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      try {
        const foundUser = await User.findOne({ email, password })

        if (!foundUser) {
          return done(null, false, {
            message: 'Incorrect email or password'
          })
        }

        const passwordIsValid = foundUser.comparePassword(password)

        if (!passwordIsValid) {
          return done(null, false, {
            message: 'Incorrect password'
          })
        }

        console.log('User found and authenticated')
        return done(null, foundUser)
      } catch (err) {
        callback(err)
      }
    }
  )
)

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_JWT_SECRET
}

passport.use(
  new JWTStrategy(options, async (jwt_payload, done) => {
    try {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      const foundUser = await User.findOneById(jwt_payload.id)

      if (!foundUser) {
        return done(null, false)
      }

      done(null, foundUser)
    } catch (err) {
      done(err, false)
    }
  })
)
