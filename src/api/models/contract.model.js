const mongoose = require('mongoose')
const contractSchema = new mongoose.Schema({
  name: String,
  file: Buffer,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true },
})

const contractModel = mongoose.model('contract',contractSchema)

module.exports = contractModel