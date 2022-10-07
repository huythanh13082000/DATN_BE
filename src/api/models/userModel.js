const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  userName: String,
  passWord: String,
  roleId: String,
  token: String,
  refreshToken: String,
})

const userModel = mongoose.model('users', userSchema)
module.exports = userModel