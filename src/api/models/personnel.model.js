const mongoose = require('mongoose')

const personnelSchema = new mongoose.Schema({
  name: String,
  adress: String,
  id_rank: String,
  id_contract: String,
  id_department: String,
  email: String,
  phoneNumber: String,
  citizenIdentification: String,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true },
  dateOfBirth: { type: Date },
  sex: 'male' | 'female',
  avatar: String,
  note: String,
  status: Boolean
})
const personnelModel = mongoose.model('personnel', personnelSchema)
module.exports = personnelModel
