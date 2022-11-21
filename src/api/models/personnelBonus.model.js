const mongoose = require('mongoose')
const { Schema } = mongoose

const personnelBonusSchema = new mongoose.Schema({
  personnel: { type: Schema.Types.ObjectId, ref: 'personnel' },
  bonus: { type: Schema.Types.ObjectId, ref: 'bonus' },
  createdAt: { type: Date, required: true, default: Date.now() },
  updatedAt: { type: Date },
})

const personnelBonusModel = mongoose.model('personnelBonus', personnelBonusSchema)

module.exports = personnelBonusModel