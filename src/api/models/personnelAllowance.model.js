const mongoose = require('mongoose')
const { Schema } = mongoose

const personnelAllowanceSchema = new mongoose.Schema({
  name: String,
  value: Number,
  personnel: { type: Schema.Types.ObjectId, ref: 'personnel' },
  allowance: { type: Schema.Types.ObjectId, ref: 'allowance' },
  createdAt: { type: Date, required: true, default: Date.now() },
  updatedAt: { type: Date },
})

const personnelAllowanceModel = mongoose.model('personnelAllowance', personnelAllowanceSchema)

module.exports = personnelAllowanceModel