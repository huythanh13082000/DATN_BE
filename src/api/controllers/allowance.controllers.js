const allowanceModel = require("../models/allowance.model")

const createAllowance = async (req, res) => {
  try {
    const data = req.body
    const allowance = await allowanceModel.create({ ...data })
    return res.status(200).json({ data: allowance, description: "Create Allowance Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const updateAllowance = async (req, res) => {

  try {
    const data = req.body
    await allowanceModel.findByIdAndUpdate({ _id: data._id }, { ...data, updatedAt: Date.now() })
    const allowance = await allowanceModel.findOne({ _id: data._id })
    return res.status(200).json({ data: allowance, description: "Update Allowance Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const deleteAllowance = async (req, res) => {

  try {
    const ids = req.body.ids
    await allowanceModel.deleteMany({ _id: { $in: ids } })
    return res.status(200).json({ description: "Delete Allowance Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getAllowance = async (req, res) => {
  const _id = req.params.id
  try {
    const allowance = await allowanceModel.findOne({ _id })
    return res.status(200).json({ data: allowance, description: "Fetching Allowance Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getListAllowance = async (req, res) => {
  const { limit, page, keyword } = req.query
  try {
    allowanceModel.find({ name: { $regex: req.query.name, $options: 'i' } }).skip(limit * page - limit).limit(limit).sort([['createdAt', -1]]).exec((error, listAllowance) => {
      allowanceModel.countDocuments((err, count) => {
        return res.status(200).json({ list: listAllowance, total: count, description: "Fetching List allowance Success" })
      })
    })
  } catch (error) {
    return res.status(403).json(error)
  }
}

module.exports = { createAllowance, updateAllowance, deleteAllowance, getAllowance, getListAllowance }