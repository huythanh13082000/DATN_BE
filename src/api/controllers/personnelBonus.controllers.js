const moment = require("moment/moment")
const personnelBonusModel = require("../models/personnelBonus.model")

const createPersonnelBonus = async (req, res) => {
  try {
    const data = req.body
    const personnelBonus = await personnelBonusModel.create({ ...data })
    return res.status(200).json({ data: personnelBonus, description: 'Create PersonnelBonus Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const updatePersonnelBonus = async (req, res) => {
  const data = req.body
  try {
    await personnelBonusModel.findByIdAndUpdate({ _id: data._id }, { ...data, updateAt: Date.now() })
    const personnelBonus = await personnelBonusModel.findOne({ _id: data._id })
    return res.status(200).json({ data: personnelBonus, description: "Update PersonnelBonus Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const deletePersonnelBonus = async (req, res) => {
  try {
    const ids = req.body.ids
    await personnelBonusModel.deleteMany({ _id: { $in: ids } })
    return res.status(200).json({ description: 'Delete PersonnelBonus Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const getPersonnelBonus = async (req, res) => {
  const _id = req.params.id
  try {
    const personnelBonus = await personnelBonusModel.findOne({ _id }).populate('personnel').populate('bonus')
    return res.status({ data: personnelBonus, description: "Fetching PersonnelBonus Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const getListPersonnelBonus = async (req, res) => {
  const { limit, page } = req.query
  const query = { ...req.query }
  const excludedFields = ["page", "sort", "limit", "fields"]
  excludedFields.forEach((e) => delete query[e])
  if (query.dateBonus) {
    const start = moment(query.dateBonus).startOf('day');
    const end = moment(query.dateBonus).endOf('day');
    query['dateBonus'] = { $gte: start, $lte: end }
  }
  try {
    personnelBonusModel.find({ ...query }).populate({ path: 'personnel', match: { name: new RegExp(req.query.personnelName, 'i') } }).populate('bonus').skip(page * limit - limit).limit(limit).sort([['createdAt', -1]]).exec((err, listPersonnelBonus) => {
      personnelBonusModel.countDocuments((err, count) => {
        const listPersonnelBonusNew = listPersonnelBonus.filter((item) => item.personnel !== null)
        return res.status(200).json({ list: listPersonnelBonusNew, total: count, description: 'Fetching List PersonnelBonus Succces' })
      })
    })
  } catch (error) {
    return res.status(403).json(error)
  }
}

module.exports = { createPersonnelBonus, updatePersonnelBonus, deletePersonnelBonus, getPersonnelBonus, getListPersonnelBonus }