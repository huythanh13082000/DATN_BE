const mongoose = require('mongoose')
const { Schema } = mongoose

const personnelSchema = new mongoose.Schema({
  name: String,
  address: String,
  rank: { type: Schema.Types.ObjectId, ref: 'rank' },
  contract: { type: Schema.Types.ObjectId, ref: 'contract' },
  department: { type: Schema.Types.ObjectId, ref: 'department' },
  email: String,
  phoneNumber: String,
  citizenIdentification: String,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date },
  dateOfBirth: { type: String },
  sex: 'male' | 'female',
  avatar: String,
  note: String,
  status: Boolean
})
const personnelModel = mongoose.model('personnel', personnelSchema)
module.exports = personnelModel
