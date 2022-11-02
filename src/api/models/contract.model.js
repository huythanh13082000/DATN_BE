const mongoose = require('mongoose')
const contractSchema = new mongoose.Schema({
  name: String,
  file: String,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date },
})

const contractModel = mongoose.model('contract', contractSchema)

module.exports = contractModel