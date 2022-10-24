const bonusModel = require("../models/bonus.model")

const createBonus = async (req, res) => {
  const data = req.body
  try {
    const bonus = await bonusModel.create({ ...data })
    return res.status(200).json({ data: bonus, description: "Create Bonus Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const updateBonus = async (req, res) => {
  const data = req.body
  const _id = req.params.id
  try {
    await bonusModel.findByIdAndUpdate({ _id }, { ...data, updatedAt: Date.now() })
    const bonus = await bonusModel.findOne({ _id })
    return res.status(200).json({ data: bonus, description: "Update Bonus Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const deleteBonus = async (req, res) => {
  const _id = req.params.id
  try {
    await bonusModel.findByIdAndDelete({ _id })
    return res.status(200).json({ description: "Delete Bonus Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getBonus = async (req, res) => {
  const _id = req.params.id
  try {
    const bonus = await bonusModel.findOne({ _id })
    return res.status(200).json({ data: bonus, description: "Fetching Bonus Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getListBonus = async (req, res) => {
  const { limit, page, keyword } = req.query
  try {
    bonusModel.find().skip(limit * page - limit).limit(limit).exec((error, listBonus) => {
      bonusModel.countDocuments((err, count) => {
        return res.status(200).json({ list: listBonus, total: count, description: "Fetching List bonus Success" })
      })
    })
  } catch (error) {
    return res.status(403).json(error)
  }
}

module.exports = { createBonus, updateBonus, deleteBonus, getBonus, getListBonus }