const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  passWord: String,
  roleId: String,
  email: { type: String, unique: true },
  refreshToken: String,
  createdAt: { type: Date, required: true, default: Date.now() },
  updatedAt: { type: Date }
})

const userModel = mongoose.model('users', userSchema)
module.exports = userModel