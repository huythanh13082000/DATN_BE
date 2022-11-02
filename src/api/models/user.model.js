const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passWord: String,
  roleId: String,
  email: String,
  refreshToken: String,
  avatar: String,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date }
})

const userModel = mongoose.model('users', userSchema)
module.exports = userModel