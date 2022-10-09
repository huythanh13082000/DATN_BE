const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');


const createUser = async (req, res) => {
  const { username, passWord, email } = req.body
  const saft = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(passWord, saft)
  await userModel.create({ username: username, passWord: hash, email: email })
  return res.json('success')
}
const defaultUser = async (req, res) => {
  // const id = req.params['id']
  const idParams = req.query.id
  console.log(idParams);
  const defaultUser = await userModel.find({ _id: idParams })
  return res.json(defaultUser)
}
const deleteUser = async (req, res) => {
  // const id = req.params['id']
  console.log(req.user._id);
  const user = await userModel.findOneAndDelete({ _id: id })
  console.log(user);
  // console.log(id);
  if (user) {
    return res.json('delete success')
  }
  else return res.json('id not valid')
}
const login = async (req, res) => {
  console.log(process.env.TOKEN_SECRET);
  const { username, passWord } = req.body
  const user = await userModel.findOne({ username })
  if (user) {
    const checkPassWord = await bcrypt.compare(passWord, user.passWord)
    if (checkPassWord) {
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
      return res.status(403).json({ accessToken: token })
    }
    else return res.status(403).json({ message: "usernam or password wrong" })
  }
}
module.exports = { createUser, defaultUser, login, deleteUser }
