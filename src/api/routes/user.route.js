const express = require('express');
const multer = require('multer');
// const { upload } = require('../../app');
const { createUser, defaultUser, login, deleteUser, refreshToken, updateUser, getListUser, changePassword } = require('../controllers/user.controllers');
const middlewareAuth = require('../middleware/auth');
const route = express.Router()
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const arrayOriginalnameSplited = file.originalname.split('.')
    const typeFile = arrayOriginalnameSplited[arrayOriginalnameSplited.length - 1]
    const fileName = file.fieldname + '-' + Date.now() + '.' + typeFile
    cb(null, fileName)
    req.filename = fileName
  }
})

const upload = multer({ storage: storage }).single('avatar')
const userRoute = route;

userRoute.post('/auth/users', upload, createUser)

userRoute.get('/auth/users/detail', middlewareAuth.verifyToken, defaultUser)

userRoute.post('/auth/signin', login)

userRoute.delete('/auth/users', middlewareAuth.verifyToken, deleteUser)
userRoute.get('/auth/users', middlewareAuth.verifyToken, getListUser)
userRoute.put('/auth/users', middlewareAuth.verifyToken, updateUser)
userRoute.post('/auth/refreshtoken', refreshToken)
userRoute.put('/auth/users/changePassWord', middlewareAuth.verifyToken, changePassword)

module.exports = userRoute