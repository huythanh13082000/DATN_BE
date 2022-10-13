const mongoose = require('mongoose')
const timeSheetSchema = new mongoose.Schema({
  id_personnel: String,
  id_department: String,
  workingDay: Date,
  status: 0 | 1 | 2,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true },
})
const timeSheetModel = mongoose.model('timeSheet',timeSheetSchema)
module.exports = timeSheetModel