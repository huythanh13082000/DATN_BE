const contractModel = require("../models/contract.model")

const createContract = async (req, res) => {
  const data = req.body
  try {
    const contract = await contractModel.create({ ...data })
    return res.status(200).json({ data: contract, description: 'Create Contract Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const updateContract = async (req, res) => {
  const data = req.body
  const _id = req.params.id
  try {
    await contractModel.findByIdAndUpdate({ _id }, { ...data, updateAt: Date.now() })
    const contract = await contractModel.findOne({ _id })
    return res.status(200).json({ data: contract, description: 'Update Contract Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const deleteContract = async (req, res) => {
  const _id = req.params.id
  try {
    await contractModel.findByIdAndDelete({ _id })
    return res.status(200).json({ description: 'Delete Contract Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getListContract = async (req, res) => {
  const { limit, page, keyword } = req.query
  try {
    contractModel.find().skip(limit * page - limit).limit(limit).exec((err, contracts) => {
      contractModel.countDocuments((err, count) => {
        return res.status(200).json({ list: contracts, total: count, description: 'Fetching List Contract Success' })
      })
    })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getContract = async (req, res) => {
  const _id = req.params.id
  try {
    const contract = await contractModel.findOne({ _id })
    return res.status(200).json({ data: contract, description: 'Fetching Contract Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
module.exports = { createContract, updateContract, deleteContract, getListContract, getContract }