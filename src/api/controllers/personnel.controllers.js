const { response } = require("express")
const personnelModel = require("../models/personnel.model")

const createPersonnel = async (req, res) => {
  const data = req.body
  console.log(777, data)
  const avatar = req.avatar
  console.log(444, avatar)
  try {
    const personnel = await personnelModel.create({ ...data, avatar })
    return res.status(200).json({ data: personnel, description: 'Create Personnel Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const updatePersonnel = async (req, res) => {
  const data = req.body
  try {
    await personnelModel.findByIdAndUpdate({ _id: data._id }, { ...data, updatedAt: Date.now() })
    const personnel = await personnelModel.findOne({ _id: data._id })
    return res.status(200).json({ data: personnel, description: 'Update Personnel Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getPersonnel = async (req, res) => {
  const _id = req.params.id
  try {
    const personnel = await personnelModel.findOne({ _id }).populate('rank').populate('department')
    return res.status(200).json({ data: personnel, description: 'Fetching Personnel Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const getListPersonnel = async (req, res) => {
  const { limit, page, keyword } = req.query
  try {
    personnelModel.find().populate('rank').skip(limit * page - limit).limit(limit).exec((err, personnels) => {
      personnelModel.countDocuments((err, count) => {
        return res.status(200).json({ list: personnels, total: count, description: 'Fetching List Personnel Success' })
      })
    })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const deletePersonnel = async (req, res) => {
  try {
    const ids = req.body.ids
    console.log(ids);
    await personnelModel.deleteMany({ _id: { $in: ids } })
    return res.status(200).json({ description: 'Delete Personnel Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}

module.exports = { createPersonnel, updatePersonnel, getPersonnel, getListPersonnel, deletePersonnel }