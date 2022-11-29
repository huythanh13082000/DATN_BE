const mongoose = require('mongoose')
const { Schema } = mongoose

const personnelDayOffSchema = new mongoose.Schema({
  personnel: { type: Schema.Types.ObjectId, ref: 'personnel' },
  dayOff: { type: Date },
  status: Number,
  createdAt: { type: Date, required: true, default: Date.now() },
  updatedAt: { type: Date },
})

const personnelDayOffModel = mongoose.model('personnelDayOff', personnelDayOffSchema)

module.exports = personnelDayOffModel