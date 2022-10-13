const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true },
})

const departmentModel = mongoose.model('department', departmentSchema)
module.exports = departmentModel