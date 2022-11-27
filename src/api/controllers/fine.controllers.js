const fineModel = require("../models/fine.model")

const createFine = async (req, res) => {
  try {
    const data = req.body
    const fine = fineModel.create({ ...data })
    return res.status(200).json({ data: fine, description: "Create Fine Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const updateFine = async (req, res) => {
  try {
    const data = req.body
    console.log(333, data)
    await fineModel.findByIdAndUpdate({ _id: data._id }, { ...data, updatedAt: Date.now() })
    const fine = await fineModel.findOne({ _id: data._id })
    return res.status(200).json({ data: fine, description: "Update Fine Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const deleteFine = async (req, res) => {
  try {
    const ids = req.body.ids
    await fineModel.findByIdAndDelete({ _id: { $in: ids } })
    return res.status(200).json({ description: "Delete Fine Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getFine = async (req, res) => {
  const _id = req.params.id
  try {
    const fine = fineModel.findOne({ _id })
    return res.status(200).json({ data: fine, description: 'Fetching Fine Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getListFine = async (req, res) => {
  const { limit, page, keyword } = req.body
  try {
    fineModel.find({ name: { $regex: req.query.name, $options: 'i' } }).skip(page * limit - limit).limit(limit).exec((err, fines) => {
      fineModel.countDocuments((err, count) => {
        return res.status(200).json({ list: fines, total: count, description: 'Fetching Fines Success' })
      })
    })
  } catch (error) {
    return res.status(403).json(error)
  }
}

module.exports = { createFine, updateFine, deleteFine, getFine, getListFine }