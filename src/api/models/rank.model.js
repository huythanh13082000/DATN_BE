const mongoose = require('mongoose')
const { Schema } = mongoose;
const rankSchema = new mongoose.Schema({
  department: { type: Schema.Types.ObjectId, ref: 'department' },
  name: String,
  value: Number,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date },
})
const rankModel = mongoose.model('rank', rankSchema)
module.exports = rankModel