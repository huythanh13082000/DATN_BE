const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date },
})

const departmentModel = mongoose.model('department', departmentSchema)
module.exports = departmentModel