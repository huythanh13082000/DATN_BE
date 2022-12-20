const personnelFineModel = require("../models/personnelFine.model")
const moment = require("moment/moment")

const createPersonnelFine = async (req, res) => {
  const data = req.body
  try {
    const personnelFine = await personnelFineModel.create({ ...data })
    return res.status(200).json({ data: personnelFine, description: "Create PersonnelFine Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const updatePersonnelFine = async (req, res) => {
  const data = req.body
  try {
    await personnelFineModel.findByIdAndUpdate({ _id: data._id }, { ...data, updatedAt: Date.now() })
    const personnelFine = await personnelFineModel.findOne({ _id: data._id })
    return res.status(200).json({ data: personnelFine, description: "update PersonnelFine Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const deletePersonnelFine = async (req, res) => {
  const ids = req.body.ids
  try {
    await personnelFineModel.deleteMany({ _id: { $in: ids } })
    return res.status(200).json({ description: "Delete PersonnelFine Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getPersonnelFine = async (req, res) => {
  const _id = req.params.id
  try {
    const personnelFine = personnelFineModel.findOne({ _id }).populate('personnel').populate('fine')
    return res.status(200).json({ data: personnelFine, description: "Fetching PersonnelFine Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getListPersonnelFine = async (req, res) => {
  const { limit, page, keyword } = req.query
  const query = { ...req.query }
  const excludedFields = ["page", "sort", "limit", "fields"]
  excludedFields.forEach((e) => delete query[e])
  if (query.dateFine) {
    const start = moment(query.dateFine).startOf('day');
    const end = moment(query.dateFine).endOf('day');
    query['dateFine'] = { $gte: start, $lte: end }
  }
  try {
    personnelFineModel.find({ ...query }).populate({ path: 'personnel', match: { name: new RegExp(req.query.personnelName, 'i') } }).populate('fine').skip(page * limit - limit).limit(limit).sort([['createdAt', -1]]).exec((err, listPersonnelFine) => {
      personnelFineModel.countDocuments((err, count) => {
        const listPersonnelFineNew = listPersonnelFine.filter((item) => item.personnel !== null)
        return res.status(200).json({ list: listPersonnelFineNew, total: count, description: 'Fetching List PersonnelFine Succces' })
      })
    })
  } catch (error) {
    return res.status(403).json(error)
  }
}

module.exports = { createPersonnelFine, updatePersonnelFine, deletePersonnelFine, getPersonnelFine, getListPersonnelFine }