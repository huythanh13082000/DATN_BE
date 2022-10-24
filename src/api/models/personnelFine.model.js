const mongoose = require('mongoose')
const { Schema } = mongoose

const personnelFineSchema = new mongoose.Schema({
  personnel: { type: Schema.Types.ObjectId, ref: 'personnel' },
  fine: { type: Schema.Types.ObjectId, ref: 'fine' },
  createdAt: { type: Date, required: true, default: Date.now() },
  updatedAt: { type: Date },
})

const personnelFineModel = mongoose.model('personnelFine', personnelFineSchema)

module.exports = personnelFineModel