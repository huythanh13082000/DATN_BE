const salaryModel = require("../models/salary.model");

const createSalary = async (req, res) => {
  const data = req.body
  const start = moment(data.day).startOf('month');
  const end = moment(data.day).endOf('month');
  await salaryModel.findOneAndDelete({ time: { $gte: start, $lte: end } })
  await salaryModel.create({ ...data })
}

module.exports = {createSalary}

