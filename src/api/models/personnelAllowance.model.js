const mongoose = require('mongoose')
const { Schema } = mongoose

const personnelAllowanceSchema = new mongoose.Schema({
  personnel: { type: Schema.Types.ObjectId, ref: 'personnel' },
  allowance: { type: Schema.Types.ObjectId, ref: 'allowance' },
  dateAllowance: { type: Date },
  createdAt: { type: Date, required: true, default: Date.now() },
  updatedAt: { type: Date },
})

const personnelAllowanceModel = mongoose.model('personnelAllowance', personnelAllowanceSchema)

module.exports = personnelAllowanceModel