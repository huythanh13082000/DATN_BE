const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { generateToken } = require("../helper/generateToken");
const personnelModel = require("../models/personnel.model");


const getListUser = async (req, res) => {
  const { limit, page } = req.query
  try {
    await userModel.find({ email: new RegExp(req.query.email, 'i') }).skip(page * limit - limit).limit(limit).sort([['createdAt', -1]]).exec((err, users) => {
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
    const data = req.body
    const saft = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(data.passWord, saft)
    await userModel.create({ passWord: hash, email: data.email, role: data.role })
    return res.status(200).json({ description: 'Tạo tài khoản thành công!' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const defaultUser = async (req, res) => {
  const idParams = req.user
  try {
    const defaultUser = await userModel.findOne({ _id: idParams })
    const personnel = await personnelModel.findOne({ email: defaultUser.email }).populate('rank')
    if (personnel)
      return res.json({ email: defaultUser.email, avatar: personnel.avatar, name: personnel.name, role: defaultUser.role, rank: personnel.rank.name })
    else
      return res.json({ email: defaultUser.email, role: defaultUser.role })
  } catch (error) {
    return res.status(403).json(error)
  }

}
const deleteUser = async (req, res) => {
  try {
    const ids = req.body.ids
    await userModel.findOneAndDelete({ _id: { $in: ids } })
    return res.json({ description: 'Xóa tài khoản thành công!' })
  } catch (error) {
    return res.json(error)
  }
}

const login = async (req, res) => {
  const { email, passWord } = req.body
  const user = await userModel.findOne({ email })
  if (user) {
    const checkPassWord = await bcrypt.compare(passWord, user.passWord)
    if (checkPassWord) {
      const tokens = generateToken({ _id: user._id })
      await userModel.findOneAndUpdate({ _id: user._id }, { refreshToken: tokens.refreshToken })
      return res.status(200).json({ ...tokens, role: user.role })
    }
    else return res.status(403).json({ message: "Email or password wrong" })
  }
  else return res.status(403).json({ message: "Email or password wrong" })

}
const updateUser = async (req, res) => {
  try {
    const data = req.body
    await userModel.findOneAndUpdate({ _id: data._id }, { ...data })
    res.status(200).json({ description: 'update user success' })
  } catch (error) {
    res.status(403).json(error)
  }
}
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body
  const user = await userModel.findOne({ refreshToken })
  if (user) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, id) => {
      if (err) {
        console.log(err)
        return res.status(403).json("refresh token expire")
      }
      const tokens = generateToken({ _id: user._id })
      const user1 = await userModel.findOneAndUpdate({ _id: user._id }, { refreshToken: tokens.refreshToken })
      return res.status(200).json(tokens)
    })

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
