const { parse } = require("json2csv");
const { exportExcel } = require("../helper/exportExcel");
const departmentModel = require("../models/department.model");

const getListDepartment = async (req, res) => {
  const { limit, page, keyword } = req.query
  console.log(33444)
  try {
    departmentModel.find().skip(page * limit - limit).limit(limit).exec((err, departments) => {
      departmentModel.countDocuments((err, count) => {
        if (err) {
          return next(err)
        }
        else {
          res.status(200).json({ list: departments, total: count })
        }
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
  const data = req.body
  const _id = req.params.id
  try {
    await departmentModel.findByIdAndUpdate({ _id }, { ...data, updatedAt: Date.now() })
    return res.status(200).json('update department success')
  } catch (error) {
    return res.status(403).json(error)
  }
}
const deleteDepartment = async (req, res) => {
  try {
    const ids = req.body.id
    await departmentModel.deleteMany({ _id: { $in: ids } })
    return res.status(200).json('delete department success')
  } catch (error) {
    return res.status(403).json(error)
  }
}


const exportExcelDepartment = async (req, res) => {
  const { limit, page, keyword } = req.query
  try {
    departmentModel.find().skip(page * limit - limit).limit(limit).exec(async (err, departments) => {
      console.log(departments);
      const fields = [
        "_id",
        "name",
        "createdAt",
      ];
      const newDeparments = departments.map((item) => { return { _id: item._id, name: item.name, createdAt: item.createdAt } })
      const csv = exportExcel(fields, newDeparments)
      res.attachment('departments.csv').send(csv)
    })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const getDepartmentColumn = async (req, res) => {
  try {
    console.log(111, departmentModel.distinct().schema.paths)
    const departmentColumn = []
    Object.keys(departmentModel.distinct().schema.paths).forEach((key, index) => {
      if (!key.includes('_')) {
        departmentColumn.push(key)
      }
    })
    return res.status(200).json(departmentColumn)
  } catch (error) {
    return res.status(403).json(error)
  }
}

module.exports = { createDepartment, updateDepartment, deleteDepartment, getListDepartment, exportExcelDepartment, getDepartmentColumn }