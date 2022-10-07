const userModel = require("../models/userModel")
const createUser = async (req, res) => {
  console.log(req.body);
  const user = req.body
  await userModel.create(user)
  return res.json('success')
}
const defaultUser = async (req, res) => {
  // const id = req.params['id']
  const idParams = req.query.id
  console.log(idParams);
  const defaultUser = await userModel.find({ _id: idParams })
  res.json(defaultUser)
}
module.exports = { createUser, defaultUser }
