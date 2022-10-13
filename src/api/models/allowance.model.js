allowance
const mongoose = require('mongoose')
const allowanceSchema = new mongoose.Schema({
  name:String,
  value:Number,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true },
})

const allowanceModel = mongoose.model('allowance',allowanceSchema)

module.exports = allowanceModel