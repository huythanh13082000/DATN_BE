const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { generateToken } = require("../helper/generateToken");


const getListUser = async (req, res) => {
  const { limit, page, keyword } = req.query
  try {
    await userModel.find().skip(page * limit - limit).limit(limit).exec((err, users) => {
      userModel.countDocuments((err, count) => {
        if (err) {
          return next(err)
        }
        else res.status(200).json({ list: departments, total: count })
      })
    })
  } catch (error) {
    console.log(error)
  }
}

const createUser = async (req, res) => {
  const { username, passWord, email } = req.body
  const saft = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(passWord, saft)
  console.log(req.body)
  try {
    await userModel.create({ username: username, passWord: hash, email: email })
    return res.status(200).json('success')
  } catch (error) {
    return res.status(403).json(error)
  }
}
const defaultUser = async (req, res) => {
  const idParams = req.query.id
  const defaultUser = await userModel.findOne({ _id: idParams })
  return res.json(defaultUser)
}
const deleteUser = async (req, res) => {
  const id = req.query.id
  try {
    await userModel.findOneAndDelete({ _id: id })
    return res.json('delete success')
  } catch (error) {
    return res.json('id not valid')
  }
}

const login = async (req, res) => {
  const { username, passWord } = req.body
  const user = await userModel.findOne({ username })
  if (user) {
    const checkPassWord = await bcrypt.compare(passWord, user.passWord)
    if (checkPassWord) {
      const tokens = generateToken({ _id: user._id })
      console.log(1111, tokens);
      await userModel.findOneAndUpdate({ _id: user._id }, { refreshToken: tokens.refreshToken })
      return res.status(200).json(tokens)
    }
    else return res.status(403).json({ message: "usernam or password wrong" })
  }
}
const updateUser = async (req, res) => {
  const data = req.body
  try {
    await userModel.findOneAndUpdate({ _id: req.user._id }, { ...data })
    res.status(200).json('update success')
  } catch (error) {
    res.status(404).json(error)
  }
}
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body
  const user = await userModel.findOne({ refreshToken })
  if (user) {
    const tokens = generateToken({ _id: user._id })
    console.log(11112, tokens);
    const user1 = await userModel.findOneAndUpdate({ _id: user._id }, { refreshToken: tokens.refreshToken })
    console.log(444, user1);
    return res.status(200).json(tokens)
  }
  else return res.status(403).json({ message: "refresh token not valid" })
}


module.exports = { createUser, defaultUser, login, deleteUser, refreshToken, updateUser, getListUser }
