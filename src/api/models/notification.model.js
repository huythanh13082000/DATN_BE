const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  name:String,
  status:String,
  createdAt: { type: Date, required: true, default: Date.now },
})

const notificationModel = mongoose.model('notification',notificationSchema)
module.exports = notificationModel