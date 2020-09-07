const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: String
})

userSchema.pre(
  'save',
  function(next) {
    let user = this

    if (user.isModified('password') || user.isNew) {
      /**
       * 哈希密码
       * 同步操作
       */
      let hashedPassword = bcrypt.hashSync(user.password, 10)

      user.password = hashedPassword
      next()
    }
  },
  function(err) {
    next(err)
  }
)

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

module.exports = model('User', userSchema)
