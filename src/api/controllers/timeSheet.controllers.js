const timeSheetModel = require("../models/timeSheet.model")

const createTimeSheet = async (req, res) => {
  const data = req.body
  try {
    const timeSheet = await timeSheetModel.create({ ...data })
    return res.status(200).json({ data: timeSheet, description: "Create TimeSheet Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const updateTimeSheet = async (req, res) => {
  const _id = req.params.id
  const data = req.body
  try {
    await timeSheetModel.findByIdAndUpdate({ _id }, { ...data, updatedAt: Date.now() })
    const timeSheet = await timeSheetModel.findOne({ _id })
    return res.status(200).json({ data: timeSheet, description: 'Update TimeSheet Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const deleteTimeSheet = async (req, res) => {
  const _id = req.params.id
  try {
    await timeSheetModel.findByIdAndDelete({ _id })
    return res.status(200).json({ description: "Delete TimeSheet Succes" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getTimeSheet = async (req, res) => {
  const _id = req.params.id
  try {
    const timeSheet = await timeSheetModel.findOne({ _id }).populate('personnel').populate('department')
    return res.status(200).json({ data: timeSheet, description: "Fetching TimeSheet Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const getListTimeSheet = async (req, res) => {
  const { limit, page, keyword } = req.query
  try {
    timeSheetModel.find().populate('personnel').populate('department').skip(limit * page - limit).limit(limit).exec((err, timeSheets) => {
      timeSheetModel.countDocuments((err, count) => {
        return res.status(200).json({ list: timeSheets, total: count, description: "Fetching List TimeSheet Succes" })
      })
    })
  } catch (error) {
    return res.status(403).json(error)
  }
}

module.exports = { createTimeSheet, updateTimeSheet, deleteTimeSheet, getTimeSheet, getListTimeSheet }