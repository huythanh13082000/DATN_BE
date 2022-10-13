const mongoose = require('mongoose')

const listAllowanceSchema = new mongoose.Schema({
  id_allowance:String,
  id_personnel:String,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true },
})
const listAllowanceModel = mongoose.model('listAllowance',listAllowanceSchema)
module.exports = listAllowanceModel