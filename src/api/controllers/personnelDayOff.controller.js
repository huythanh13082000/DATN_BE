const personnelDayOffModel = require("../models/personnelDayOff.model")

const createPersonnelDayOff = async (req, res) => {
  try {
    const data = req.body
    const personnelDayOff = await personnelDayOffModel.create({ ...data })
    return res.status(200).json({ data: personnelDayOff, description: 'Create PersonnelDayOff Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const updatePersonnelDayOff = async (req, res) => {
  const data = req.body
  try {
    await personnelDayOffModel.findByIdAndUpdate({ _id: data._id }, { ...data, updateAt: Date.now() })
    const personnelDayOff = await personnelDayOffModel.findOne({ _id: data._id })
    return res.status(200).json({ data: personnelDayOff, description: "Update PersonnelDayOff Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const deletePersonnelDayOff = async (req, res) => {
  try {
    const ids = req.body.ids
    await personnelDayOffModel.deleteMany({ _id: { $in: ids } })
    return res.status(200).json({ description: 'Delete PersonnelDayOff Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const getPersonnelDayOff = async (req, res) => {
  const _id = req.params.id
  try {
    const personnelDayOff = await personnelDayOffModel.findOne({ _id }).populate('personnel')
    return res.status({ data: personnelDayOff, description: "Fetching PersonnelDayOff Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const getListPersonnelDayOff = async (req, res) => {
  const { limit, page, keyword } = req.query
  const query = { ...req.query }
  const excludedFields = ["page", "sort", "limit", "fields"]
  excludedFields.forEach((e) => delete query[e])
  try {
    personnelDayOffModel.find(query).populate({
      path: 'personnel',
      match: { name: new RegExp('Nhat', 'i') },
      // sort: { name: -1 }
    }).skip(page * limit - limit).limit(limit).sort([['createdAt', -1]]).exec((err, listPersonnelDayOff) => {
      console.log(345, listPersonnelDayOff);
      const listPersonnelDayOffNew = listPersonnelDayOff.filter((item) => item.personnel !== null)
      personnelDayOffModel.countDocuments((err, count) => {
        return res.status(200).json({ list: listPersonnelDayOffNew, total: count, description: 'Fetching List PersonnelDayOff Succces' })
      })
    })
    // const listPersonnelDayOff = await personnelDayOffModel.find(query).populate('personnel')
    // return res.status(200).json({ list: listPersonnelDayOff })
  } catch (error) {
    return res.status(403).json(error)
  }
}

module.exports = { createPersonnelDayOff, updatePersonnelDayOff, deletePersonnelDayOff, getPersonnelDayOff, getListPersonnelDayOff }