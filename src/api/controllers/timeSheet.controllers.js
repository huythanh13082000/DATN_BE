const moment = require("moment/moment")
const personnelModel = require("../models/personnel.model")
const timeSheetModel = require("../models/timeSheet.model")


const createTimeSheetMany = async (req, res) => {
  try {
    const data = req.body
    const workingDay = data.workingDay
    console.log(555, workingDay);
    const start = moment(workingDay).startOf('day');
    // end today
    const end = moment(workingDay).endOf('day');
    const lisTimeSheet = await timeSheetModel.find({ workingDay: { $gte: start, $lte: end } })
    console.log(5555, lisTimeSheet);
    if (lisTimeSheet.length === 0) {
      const listPersonnel = await personnelModel.find()
      console.log(43333, listPersonnel);
      const data = listPersonnel.map((item) => {
        return { personnel: item._id, workingDay: workingDay, status: '0' }
      })
      const timeSheets = await timeSheetModel.insertMany(data)
      return res.status(200).json({ data: timeSheets, description: `Create TimeSheet ${moment(workingDay).format('DD/MM/YYYY')} Success` })
    }
    else {
      return res.status(200).json({ data: lisTimeSheet, description: `time attendance data on ${moment(workingDay).format('DD/MM/YYYY')} was created before` })
    }
  } catch (error) {
    return res.status(403).json(error)
  }
}

const createTimeSheet = async (req, res) => {
  try {
    const data = req.body
    const timeSheets = await timeSheetModel.create(data)
    return res.status(200).json({ data: timeSheets, description: "Create TimeSheet Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getListPersonnelTimeSheet = async (req, res) => {
  try {
    const listPersonnel = await personnelModel.find({}).populate('rank')
    console.log(listPersonnel);
    return res.status(200).json({ data: listPersonnel })
  } catch (error) {
    console.log(error)
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
  // start today
  const start = moment().startOf('day');
  // end today
  const end = moment(today).endOf('day');
  // const _id = req.params.id
  try {
    await timeSheetModel.findByIdAndDelete({ createdAt: { '$gte': start, '$lte': end } })
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

module.exports = { createTimeSheetMany, updateTimeSheet, deleteTimeSheet, getTimeSheet, getListTimeSheet, getListPersonnelTimeSheet, createTimeSheet }