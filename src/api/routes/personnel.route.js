const express = require('express')
const multer = require('multer')
const { createPersonnel, updatePersonnel, deletePersonnel, getPersonnel, getListPersonnel } = require('../controllers/personnel.controllers')
const middlewareAuth = require('../middleware/auth')
const personnelRoute = express.Router()

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(555533, req)
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    console.log(5555, file)
    const arrayOriginalnameSplited = file.originalname.split('.')
    const typeFile = arrayOriginalnameSplited[arrayOriginalnameSplited.length - 1]
    const fileName = file.fieldname + '-' + Date.now() + '.' + typeFile
    cb(null, fileName)
    req.avatar = fileName
  }
})

const upload = multer({ storage: storage }).single('avatar')

personnelRoute.post('/personnels', upload, createPersonnel)
personnelRoute.put('/personnels', middlewareAuth.verifyToken, updatePersonnel)
personnelRoute.delete('/personnels', middlewareAuth.verifyToken, deletePersonnel)
personnelRoute.get('/personnel/:id', middlewareAuth.verifyToken, getPersonnel)
personnelRoute.get('/personnels', middlewareAuth.verifyToken, getListPersonnel)

module.exports = personnelRoute