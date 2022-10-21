const departmentModel = require("../models/department.model");

const getListDepartment = async (req, res) => {
  const { limit, page} = req.body
}

const createDepartment = async (req, res) => {
  const data = req.body;
  try {
    await departmentModel.create({ ...data })
    res.status(200).json('create department success')
  } catch (error) {
    res.status(403).json(error)
  }
}
const updateDepartment = async (req, res) => {
  const data = req.body
  try {
    await departmentModel.findByIdAndUpdate({ _id: req.user._id }, { ...data })
    req.status(200).json('update department success')
  } catch (error) {
    res.status(403).json(error)
  }
}
const deleteDepartment = async (req, res) => {
  try {
    await departmentModel.findByIdAndDelete({ _id: req.user._id })
    req.status(200).json('delete department success')
  } catch (error) {
    req.status(403).json(error)
  }
}

module.exports = { createDepartment, updateDepartment, deleteDepartment }