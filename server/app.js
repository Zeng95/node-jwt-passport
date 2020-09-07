const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const passport = require('passport')
const { success, error } = require('consola')

const app = express()
const port = process.env.APP_PORT || 3000

require('dotenv').config()
require('./config/database')
require('./config/passport')

const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())

app.use('/api', authRouter)
app.use('/api', usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404

  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(port, err => {
  if (err) {
    error({
      message: err,
      badge: true
    })
  } else {
    success({
      message: `Example app listening on port ${port}!`,
      badge: true
    })
  }
})
