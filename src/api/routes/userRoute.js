const express = require('express')
const { createUser } = require('../controllers/userControllers');
const route = express.Router()

const userRoute = route.post('/api/user', createUser)

module.exports = userRoute