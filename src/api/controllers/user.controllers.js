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
        else res.status(200).json({ list: users, total: count })
      })
    })
  } catch (error) {
    console.log(error)
  }
}

const createUser = async (req, res) => {

  try {
    const { passWord, email } = req.body
    console.log(5555, email);
    const user = await userModel.findOne({ email })
    console.log(4444, user);
    if (!user) {
      console.log(4444445, user);
      const saft = await bcrypt.genSalt(10)
      console.log(78888, saft);
      const hash = await bcrypt.hash(passWord, saft)
      console.log(788889, hash);
      await userModel.create({ passWord: hash, email: email })
      return res.status(200).json('success')
    }
    else {
      return res.status(403).json({ description: 'email đã được sử dụng' })
    }
  } catch (error) {
    return res.status(403).json(error)
  }
}
const defaultUser = async (req, res) => {
  const idParams = req.user
  try {
    const defaultUser = await userModel.findOne({ _id: idParams })
    return res.json({ email: defaultUser.email, avatar: defaultUser.avatar })
  } catch (error) {
    return res.status(403).json(error)
  }

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
  const { email, passWord } = req.body
  const user = await userModel.findOne({ email })
  console.log(user)
  if (user) {
    const checkPassWord = await bcrypt.compare(passWord, user.passWord)
    if (checkPassWord) {
      const tokens = generateToken({ _id: user._id })
      console.log(1111, tokens);
      await userModel.findOneAndUpdate({ _id: user._id }, { refreshToken: tokens.refreshToken })
      return res.status(200).json(tokens)
    }
    else return res.status(403).json({ message: "Email or password wrong" })
  }
  else return res.status(403).json({ message: "Email or password wrong" })

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

const changePassword = async (req, res) => {
  const { newPassWord, oldPassWord } = req.body
  const user = await userModel.findOne({ _id: req.user._id })
  if (user) {
    const checkPassWord = await bcrypt.compare(oldPassWord, user.passWord)
    if (checkPassWord) {
      const saft = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(newPassWord, saft)
      try {
        await userModel.findByIdAndUpdate({ _id: req.user._id }, { passWord: hash })
        return res.status(200).json({ description: 'Update PassWord Success' })
      } catch (error) {
        return res.status(403).json(error)
      }
    }
    else {
      return res.status(403).json({ description: "Old Password wrong!" })
    }
  }
  else {
    return res.json({ description: 'not find user' })
  }
}


module.exports = { createUser, defaultUser, login, deleteUser, refreshToken, updateUser, getListUser, changePassword }
