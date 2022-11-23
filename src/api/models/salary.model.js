const mongoose = require('mongoose')

const salarySchema = new mongoose.Schema({
  time: { type: Date },
  data: Array,
  createdAt: { type: Date, required: true, default: Date.now },
})

const salaryModel = mongoose.model('salarys', salarySchema)
module.exports = salaryModel