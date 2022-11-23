const salaryModel = require("../models/salary.model");4
const moment = require("moment/moment")

const createSalary = async (req, res) => {
  const data = req.body
  const start = moment(data.day).startOf('month');
  const end = moment(data.day).endOf('month');
  await salaryModel.findOneAndDelete({ time: { $gte: start, $lte: end } })
  await salaryModel.create({ ...data })
}
const getSalary = async (req, res) => {
  console.log(111)
  try {
    const start = moment().startOf('month');
    console.log(start)
    const end = moment().endOf('month');
    console.log(start, end)
    const data = await salaryModel.findOne({ time: { $gte: start, $lte: end } })
    return res.status(200).json({ data, description: 'Fetching Salary Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}

module.exports = { createSalary, getSalary }

