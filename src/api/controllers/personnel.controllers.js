const { response } = require("express")
const personnelModel = require("../models/personnel.model")

const createPersonnel = async (req, res) => {
  const data = req.body
  const avatar = req.avatar
  try {
    const personnel = await personnelModel.create({ ...data, avatar })
    return res.status(200).json({ data: personnel, description: 'Create Personnel Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const updatePersonnel = async (req, res) => {
  try {
    const data = req.body
    const avatar = req.avatar
    await personnelModel.findByIdAndUpdate({ _id: data._id }, { ...data, avatar, updatedAt: Date.now() })
    const personnel = await personnelModel.findOne({ _id: data._id })
    return res.status(200).json({ data: personnel, description: 'Update Personnel Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getPersonnel = async (req, res) => {
  const _id = req.params.id
  try {
    const personnel = await personnelModel.findOne({ _id }).populate('rank')
    return res.status(200).json({ data: personnel, description: 'Fetching Personnel Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const getPersonnelEmail = async (req, res) => {
  const email = req.params.email
  try {
    const personnel = await personnelModel.findOne({ email }).populate('rank')
    return res.status(200).json({ data: personnel, description: 'Fetching Personnel Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const getListPersonnel = async (req, res) => {
  const { limit, page } = req.query
  const query = { ...req.query }
  const excludedFields = ["page", "sort", "limit", "fields"]
  excludedFields.forEach((e) => delete query[e])
  query['name'] = new RegExp(req.query.name, 'i')
  query['email'] = new RegExp(req.query.email, 'i')
  try {
    personnelModel.find({ ...query }).populate('rank').skip(limit * page - limit).limit(limit).sort([['createdAt', -1]]).exec((err, personnels) => {
      console.log(personnels);
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
    await personnelModel.deleteMany({ _id: { $in: ids } })
    return res.status(200).json({ description: 'Delete Personnel Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}

module.exports = { createPersonnel, updatePersonnel, getPersonnel, getListPersonnel, deletePersonnel, getPersonnelEmail }