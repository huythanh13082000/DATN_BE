const mongoose = require('mongoose')
const fineSchema = new mongoose.Schema({
  name: String,
  value: Number,
  createdAt: { type: Date, required: true, default: Date.now() },
  updatedAt: { type: Date },
})

const fineModel = mongoose.model('fine', fineSchema)
module.exports = fineModel
