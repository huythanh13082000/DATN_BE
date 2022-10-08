const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
  roleName: String,
  permissionResources: Array
})

const roleModel = mongoose.model('roles', roleSchema)
module.exports = roleModel