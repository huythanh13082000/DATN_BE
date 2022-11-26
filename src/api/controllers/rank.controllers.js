const rankModel = require("../models/rank.model");

const createRank = async (req, res) => {
  const data = req.body;
  try {
    const rank = await rankModel.create({
      ...data
    })
    return res.status(200).json({ data: rank, description: 'Create Rank Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const updateRank = async (req, res) => {

  try {
    const data = req.body
    const newdata = { name: data.name, value: data.value, department: data.department }
    await rankModel.findByIdAndUpdate({ _id: data._id },
      { ...newdata, updatedAt: Date.now() })
    const rank = await rankModel.findById({ _id: data._id })
    return res.status(200).json({ data: rank, description: 'Update Rank Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const deleteRank = async (req, res) => {
  try {
    const ids = req.body.ids
    console.log(ids);
    await rankModel.deleteMany({ _id: { $in: ids } })
    return res.status(200).json({ description: 'Delete Rank Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getListRank = async (req, res) => {
  const { limit, page, keyword, name } = req.query
  try {
    rankModel.find({ name: { $regex: name } }).populate('department').skip(page * limit - limit).limit(limit).exec((err, ranks) => {
      rankModel.countDocuments((err, count) => {
        return res.status(200).json({ list: ranks, total: count, description: 'Fetching List Rank Success' })
      })
    })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getRank = async (req, res) => {
  const _id = req.params
  try {
    const rank = await rankModel.findOne(_id).populate('department')
    return res.status(200).json({ data: rank, description: 'Fetching Rank Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
module.exports = { createRank, updateRank, deleteRank, getListRank, getRank }