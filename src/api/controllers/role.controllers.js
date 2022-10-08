const roleModel = require("../models/role.model");

const createRole = async (req, res) => {
  const role = req.body
  await roleModel.create(role)
  return res.json('create role success')
}

module.exports = { createRole }