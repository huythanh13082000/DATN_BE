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
  const data = req.body
  const _id = req.params.id
  try {
    await rankModel.findByIdAndUpdate({ _id }, { ...data, updatedAt: Date.now() })
    const rank = await rankModel.findById({ _id })
    return res.status(200).json({ data: rank, description: 'Update Rank Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const deleteRank = async (req, res) => {
  const _id = req.params.id
  try {
    await rankModel.findByIdAndDelete({ _id })
    return res.status(200).json({ description: 'Delete Rank Success' })
  } catch (error) {
    return res.status(403).json(error)

  }
}
const getListRank = async (req, res) => {
  const { limit, page, keyword } = req.query
  try {
    rankModel.find({}).populate('department').skip(page * limit - limit).limit(limit).exec((err, ranks) => {
      console.log(222, ranks)
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