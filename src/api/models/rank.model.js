const mongoose = require('mongoose')
const rankSchema = new mongoose.Schema({
  id_department: String,
  name: String,
  value: Number,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true },
})
const rankModel = mongoose.model('rank',rankSchema)
module.exports = rankModel