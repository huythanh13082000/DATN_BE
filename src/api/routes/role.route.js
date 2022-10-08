const express = require('express')
const { createRole } = require('../controllers/roleControllers')
const route = express.Router()
const roleRoute = route;
roleRoute.post('/api/role', createRole)

module.exports = roleRoute