const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');


const createUser = async (req, res) => {
  const { username, passWord } = req.body
  const saft = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(passWord, saft)
  await userModel.create({ username: username, passWord: hash })
  return res.json('success')
}
const defaultUser = async (req, res) => {
  // const id = req.params['id']
  const idParams = req.query.id
  console.log(idParams);
  const defaultUser = await userModel.find({ _id: idParams })
  res.json(defaultUser)
}
const deleteUser = async (req, res) => {
  const id = req.params['id']
  const user = await userModel.findOneAndDelete({ _id: id })
  if (user) {
    res.json('delete success')
  }
  else res.json('id not valid')
}
const login = async (req, res) => {
  console.log(process.env.TOKEN_SECRET);
  const { username, passWord } = req.body
  const user = await userModel.findOne({ username })
  if (user) {
    const checkPassWord = await bcrypt.compare(passWord, user.passWord)
    if (checkPassWord) {
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
      res.status(403).json({ accessToken: token })
    }
    else res.status(403).json({ message: "usernam or password wrong" })
  }
}
module.exports = { createUser, defaultUser, login, deleteUser }
