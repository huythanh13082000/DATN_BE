const express = require('express')
const { createUser, defaultUser, login, deleteUser } = require('../controllers/user.controllers');
const middlewareAuth = require('../middleware/auth');
const route = express.Router()

const userRoute = route;

userRoute.post('/auth/signin', createUser)

userRoute.get('/auth/profile', defaultUser)

userRoute.post('/auth/login', login)

userRoute.delete('/user/delete/:id', middlewareAuth.verifyToken, deleteUser)

module.exports = userRoute