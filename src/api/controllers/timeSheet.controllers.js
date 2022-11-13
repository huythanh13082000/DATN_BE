const moment = require("moment/moment")
const { populate } = require("../models/personnel.model")
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
    const lisTimeSheet = await timeSheetModel.find({ workingDay: { $gte: start, $lte: end } }).populate('personnel')
    console.log(5555, lisTimeSheet);
    if (lisTimeSheet.length === 0) {
      const listPersonnel = await personnelModel.find()
      console.log(43333, listPersonnel);
      const data = listPersonnel.map((item) => {
        return { personnel: item._id, workingDay: workingDay, status: 1 }
      })
      await timeSheetModel.insertMany(data)
      const timeSheets = await timeSheetModel.find({ workingDay: { $gte: start, $lte: end } }).populate('personnel')
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
  // const _id = req.params.id
  try {
    const data = req.body
    await timeSheetModel.findByIdAndUpdate({ _id: data._id }, { status: data.status, updatedAt: Date.now() })
    const timeSheet = await timeSheetModel.findOne({ _id: data._id })
    return res.status(200).json({ data: timeSheet, description: 'Update TimeSheet Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const deleteTimeSheet = async (req, res) => {
  // start today
  const workingDay = req.body.workingDay
  const start = moment(workingDay).startOf('day');
  // end today
  const end = moment(workingDay).endOf('day');
  // const _id = req.params.id
  try {
    const listTimeSheet = await timeSheetModel.find({ workingDay: { $gte: start, $lte: end } })
    if (listTimeSheet.length === 0) {
      return res.status(200).json({ description: `No data found ${moment(workingDay).format('DD/MM/YYYY')}` })
    }
    await timeSheetModel.deleteMany({ workingDay: { $gte: start, $lte: end } })
    return res.status(200).json({ description: "Delete TimeSheet Succes" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getTimeSheet = async (req, res) => {
  const _id = req.params.id
  try {
    const timeSheet = await timeSheetModel.findOne({ _id }).populate('personnel')
    return res.status(200).json({ data: timeSheet, description: "Fetching TimeSheet Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const getListTimeSheet = async (req, res) => {
  try {
    const { limit, page, keyword } = req.query
    timeSheetModel.find().populate('personnel').skip(limit * page - limit).limit(limit).exec((err, timeSheets) => {
      timeSheetModel.countDocuments((err, count) => {
        return res.status(200).json({ list: timeSheets, total: count, description: "Fetching List TimeSheet Succes" })
      })
    })
  } catch (error) {
    return res.status(403).json(error)
  }
}

module.exports = { createTimeSheetMany, updateTimeSheet, deleteTimeSheet, getTimeSheet, getListTimeSheet, getListPersonnelTimeSheet, createTimeSheet }