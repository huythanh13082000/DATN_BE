const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  passWord: String,
  role: String,
  email: { type: String },
  refreshToken: String,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date }
})

const userModel = mongoose.model('users', userSchema)
module.exports = userModel