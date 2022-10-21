const express = require('express');
const { upload } = require('../../app');
const { createUser, defaultUser, login, deleteUser, refreshToken, updateUser, getListUser } = require('../controllers/user.controllers');
const middlewareAuth = require('../middleware/auth');
const route = express.Router()

const userRoute = route;

userRoute.post('/auth/signup', createUser)

userRoute.get('/auth/profile', defaultUser)

userRoute.post('/auth/signin', login)

userRoute.delete('/user/delete', middlewareAuth.verifyToken, deleteUser)
userRoute.get('/user', middlewareAuth.verifyToken, getListUser)
userRoute.put('/user/update', middlewareAuth.verifyToken, updateUser)
userRoute.post('/auth/refreshtoken', refreshToken)

module.exports = userRoute