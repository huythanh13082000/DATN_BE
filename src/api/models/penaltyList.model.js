const mongoose = require('mongoose')

const penaltyListSchema = new mongoose.Schema({
  id_personnel:String,
  id_fines:String,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true },
})

const penaltyListModel = mongoose.model('penaltyList',penaltyListSchema)

module.exports = penaltyListModel