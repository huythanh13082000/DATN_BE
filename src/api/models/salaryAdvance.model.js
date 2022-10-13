const mongoose = require('mongoose')

const salaryAdvanceSchema = new mongoose.Schema({
  id_personnel: String,
  value: Number,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true },
})

const salaryAdvanceModel = mongoose.model('salaryAdvance', salaryAdvanceSchema)
module.exports = salaryAdvanceModel