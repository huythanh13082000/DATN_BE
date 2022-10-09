const express = require('express')
const { createUser, defaultUser, login, deleteUser } = require('../controllers/user.controllers');
const middlewareAuth = require('../middleware/auth');
const route = express.Router()

const userRoute = route;

userRoute.post('/auth/signup', createUser)

userRoute.get('/auth/profile', defaultUser)

userRoute.post('/auth/signin', login)

userRoute.delete('/user/delete', middlewareAuth.verifyToken, deleteUser)

module.exports = userRoute