const userModel = require("../models/userModel")
const createUser = async (req, res) => {
  console.log(req.body);
  const user = req.body
  await userModel.create(user)
  return res.json('success')
}

module.exports = { createUser }
