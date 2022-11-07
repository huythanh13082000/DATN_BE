const express = require('express')
const { createPersonnel, updatePersonnel, deletePersonnel, getPersonnel, getListPersonnel } = require('../controllers/personnel.controllers')
const middlewareAuth = require('../middleware/auth')
const personnelRoute = express.Router()

personnelRoute.post('/personnels', middlewareAuth.verifyToken, createPersonnel)
personnelRoute.put('/personnels', middlewareAuth.verifyToken, updatePersonnel)
personnelRoute.delete('/personnels', middlewareAuth.verifyToken, deletePersonnel)
personnelRoute.get('/personnel/:id', middlewareAuth.verifyToken, getPersonnel)
personnelRoute.get('/personnels', middlewareAuth.verifyToken, getListPersonnel)

module.exports = personnelRoute