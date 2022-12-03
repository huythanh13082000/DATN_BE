const notificationModel = require("../models/notification.model")

const createNotification = async (req, res) => {
  const data = req.body
  try {
    const notification = notificationModel.create({ ...data })
    return res.status(200).json({ data: notification, description: "Create Notification Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const updateNotification = async (req, res) => {
  const data = req.body
  try {
    await notificationModel.findByIdAndUpdate({ _id: data._id }, { ...data, updatedAt: Date.now() })
    const notification = await notificationModel.findOne({ _id })
    return res.status(200).json({ data: notification, description: "Update Notification Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const deleteNotification = async (req, res) => {
  const ids = req.body.ids
  try {
    await notificationModel.deleteMany({ _id: { $in: ids } })
    return res.status(200).json({ description: "Delete Notification Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getNotification = async (req, res) => {
  const _id = req.params.id
  try {
    const notification = notificationModel.findOne({ _id })
    return res.status(200).json({ data: notification, description: 'Fetching Notification Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getListNotification = async (req, res) => {
  const { limit, page, keyword } = req.body
  try {
    notificationModel.find().skip(page * limit - limit).limit(limit).exec((err, notifications) => {
      notificationModel.countDocuments((err, count) => {
        return res.status(200).json({ list: notifications, total: count, description: 'Fetching Notifications Success' })
      })
    })
  } catch (error) {
    return res.status(403).json(error)
  }
}

module.exports = { createNotification, updateNotification, deleteNotification, getNotification, getListNotification }