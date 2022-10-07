const express = require('express')
const { createUser, defaultUser } = require('../controllers/userControllers');
const route = express.Router()

const userRoute = route;

userRoute.post('/auth/signin', createUser)

userRoute.get('/auth/profile', defaultUser)

module.exports = userRoute