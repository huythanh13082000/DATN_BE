const departmentModel = require("../models/department.model");

const getListDepartment = async (req, res) => {
  const { limit, page, keyword } = req.query
  try {
    await departmentModel.find().skip(page * limit - limit).limit(limit).exec((err, departments) => {
      departmentModel.countDocuments((err, count) => {
        if (err) {
          return next(err)
        }
        else res.status(200).json({ list: departments, total: count })
      })
    })
  } catch (error) {
    console.log(error)
  }

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
  // const data = req.body
  console.log(4444, req.params)
  const _id = req.params
  try {
    const department = await departmentModel.findOne({ _id });
    console.log(department, 1111)
    // await departmentModel.findByIdAndUpdate({ _id: id }, { ...department, updatedAt: Date.now() })
    return res.status(200).json('update department success')
  } catch (error) {
    return res.status(403).json(error)
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

module.exports = { createDepartment, updateDepartment, deleteDepartment, getListDepartment }