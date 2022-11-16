const mongoose = require('mongoose')
const { Schema } = mongoose
const timeSheetSchema = new mongoose.Schema({
  personnel: { type: Schema.Types.ObjectId, ref: 'personnel' },
  // workingDay: Date,
  // status: Number,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date },
})
const timeSheetModel = mongoose.model('timeSheet', timeSheetSchema)
module.exports = timeSheetModel