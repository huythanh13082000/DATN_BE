const mongoose = require('mongoose')
const { Schema } = mongoose
const notificationSchema = new mongoose.Schema({
  // sender: { type: Schema.Types.ObjectId, ref: 'users' },
  receiver: { type: Array },
  name: String,
  content: String,
  isRead: { type: Array },
  createdAt: { type: Date, default: Date.now() }
})

const notificationModel = mongoose.model('notification', notificationSchema)
module.exports = notificationModel