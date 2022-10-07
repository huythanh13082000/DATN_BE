const mongoose = require('mongoose')
const permissionResourcesSchema = mongoose.Schema({
  name: String,
  code: String
})
const permissionResourcesModel = mongoose.model('permission_resources', permissionResourcesSchema)
module.exports = permissionResourcesModel