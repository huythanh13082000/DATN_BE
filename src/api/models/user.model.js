const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  passWord: String,
  roleId: String,
  email: String,
  refreshToken: String,
  avatar: String,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true }
})

const userModel = mongoose.model('users', userSchema)
module.exports = userModel