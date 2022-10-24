const fineModel = require("../models/fine.model")

const createFine = async (req, res) => {
  const data = req.body
  try {
    const fine = fineModel.create({ ...data })
    return res.status(200).json({ data: fine, description: "Create Fine Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const updateFine = async (req, res) => {
  const data = req.body
  const _id = req.params.id
  try {
    await fineModel.findByIdAndUpdate({ _id }, { ...data, updatedAt: Date.now() })
    const fine = await fineModel.findOne({ _id })
    return res.status(200).json({ data: fine, description: "Update Fine Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const deleteFine = async (req, res) => {
  const _id = req.params.id
  try {
    await fineModel.findByIdAndDelete({ _id })
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
    fineModel.find().skip(page * limit - limit).limit(limit).exec((err, fines) => {
      fineModel.countDocuments((err, count) => {
        return res.status(200).json({ list: fines, total: count, description: 'Fetching Fines Success' })
      })
    })
  } catch (error) {
    return res.status(403).json(error)
  }
}

module.exports = { createFine, updateFine, deleteFine, getFine ,getListFine}