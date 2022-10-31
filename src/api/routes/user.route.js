const express = require('express');
const multer = require('multer');
// const { upload } = require('../../app');
const { createUser, defaultUser, login, deleteUser, refreshToken, updateUser, getListUser } = require('../controllers/user.controllers');
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

userRoute.post('/auth/signup', upload, createUser)

userRoute.get('/auth/profile', middlewareAuth.verifyToken, defaultUser)

userRoute.post('/auth/signin', login)

userRoute.delete('/user/delete', middlewareAuth.verifyToken, deleteUser)
userRoute.get('/user', middlewareAuth.verifyToken, getListUser)
userRoute.put('/user/update', middlewareAuth.verifyToken, updateUser)
userRoute.post('/auth/refreshtoken', refreshToken)

module.exports = userRoute