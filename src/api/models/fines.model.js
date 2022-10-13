const mongoose = require('mongoose')
const finesSchema = new mongoose.Schema({
  name: String,
  fines: Number,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true },
})

const finesModel = mongoose.Model('fines', finesSchema)
module.exports = finesModel
