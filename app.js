const express = require('express')
const { success, error } = require('consola')

const app = express()
const port = 3000

require('dotenv').config()
require('./database')
require('./passport')

const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')

app.use('/api', authRouter)
app.use('/api', usersRouter)

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
