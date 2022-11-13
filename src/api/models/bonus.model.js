const mongoose = require('mongoose')

const bonusSchema = mongoose.Schema({
  name: String,
  value: String,
  createdAt: { type: Date, required: true, default: Date.now() },
  updatedAt: { type: Date },
})

const bonusModel = mongoose.model('bonus', bonusSchema)

module.exports = bonusModel