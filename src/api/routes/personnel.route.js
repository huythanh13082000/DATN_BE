const express = require('express')
const { createPersonnel, updatePersonnel, deletePersonnel, getPersonnel, getListPersonnel } = require('../controllers/personnel.controllers')
const middlewareAuth = require('../middleware/auth')
const personnelRoute = express.Router()

personnelRoute.post('/personnel', middlewareAuth.verifyToken, createPersonnel)
personnelRoute.put('/personnel/:id', middlewareAuth.verifyToken, updatePersonnel)
personnelRoute.delete('/personnel/:id', middlewareAuth.verifyToken, deletePersonnel)
personnelRoute.get('/personnel/:id', middlewareAuth.verifyToken, getPersonnel)
personnelRoute.get('/personnel', middlewareAuth.verifyToken, getListPersonnel)

module.exports = personnelRoute