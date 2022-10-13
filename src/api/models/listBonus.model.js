const mongoose = require('mongoose')

const listBonusSchema = new mongoose.Schema({
  name:String,
  value:Number,
  id_personnel:String,
  id_bonus:String,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true },
})

const listBonusModel = mongoose.model('listBonus',listBonusSchema)

module.exports = listBonusModel