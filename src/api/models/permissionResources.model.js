const mongoose = require('mongoose')
const permissionResourcesSchema = new mongoose.Schema({
  name: String,
  code: String
})
const permissionResourcesModel = mongoose.model('permission_resources', permissionResourcesSchema)
module.exports = permissionResourcesModel