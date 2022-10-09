const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { generateToken } = require("../helper/generateToken");


const createUser = async (req, res) => {
  const { username, passWord, email } = req.body
  const saft = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(passWord, saft)
  await userModel.create({ username: username, passWord: hash, email: email })
  return res.json('success')
}
const defaultUser = async (req, res) => {
  const idParams = req.query.id
  const defaultUser = await userModel.findOne({ _id: idParams })
  return res.json(defaultUser)
}
const deleteUser = async (req, res) => {
  const user = await userModel.findOneAndDelete({ _id: id })
  console.log(user);
  if (user) {
    return res.json('delete success')
  }
  else return res.json('id not valid')
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


module.exports = { createUser, defaultUser, login, deleteUser, refreshToken }
