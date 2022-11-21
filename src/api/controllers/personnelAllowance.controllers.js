const personnelAllowanceModel = require("../models/personnelAllowance.model")

const createPersonnelAllowance = async (req, res) => {
  const data = req.body
  try {
    const personnelAllowance = await personnelAllowanceModel.create({ ...data })
    return res.status(200).json({ data: personnelAllowance, description: 'Create PersonnelAllowance Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const updatePersonnelAllowance = async (req, res) => {
  const data = req.body
  try {
    await personnelAllowanceModel.findByIdAndUpdate({ _id: data._id }, { ...data, updateAt: Date.now() })
    const personnelAllowance = await personnelAllowanceModel.findOne({ _id: data._id })
    return res.status(200).json({ data: personnelAllowance, description: "Update PersonnelAllowance Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const deletePersonnelAllowance = async (req, res) => {
  const ids = req.body.ids
  try {
    await personnelAllowanceModel.deleteMany({ _id: { $in: ids } })
    return res.status(200).json({ description: 'Delete PersonnelAllowance Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const getPersonnelAllowance = async (req, res) => {
  const _id = req.params.id
  try {
    const personnelAllowance = await personnelAllowanceModel.findOne({ _id }).populate('personnel').populate('bonus')
    return res.status({ data: personnelAllowance, description: "Fetching PersonnelAllowance Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const getListPersonnelAllowance = async (req, res) => {
  const { limit, page, keyword } = req.query
  try {
    personnelAllowanceModel.find().populate('personnel').populate('bonus').skip(page * limit - limit).limit(limit).exec((err, listPersonnelAllowance) => {
      personnelAllowanceModel.countDocuments((err, count) => {
        return res.status(200).json({ list: listPersonnelAllowance, total: count, description: 'Fetching List PersonnelAllowance Succces' })
      })
    })
  } catch (error) {
    return res.status(403).json(error)
  }
}

module.exports = { createPersonnelAllowance, updatePersonnelAllowance, deletePersonnelAllowance, getPersonnelAllowance, getListPersonnelAllowance }