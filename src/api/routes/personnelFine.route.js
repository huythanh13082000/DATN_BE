const express = require('express')
const { createPersonnelFine, updatePersonnelFine, deletePersonnelFine, getPersonnelFine, getListPersonnelFine } = require('../controllers/personnelFine.controllers')
const middlewareAuth = require('../middleware/auth')


const personnelFineRoute = express.Router()

personnelFineRoute.post('/personnelFine', middlewareAuth.verifyToken, createPersonnelFine)
personnelFineRoute.put('/personnelFine/:id', middlewareAuth.verifyToken, updatePersonnelFine)
personnelFineRoute.delete('/personnelFine/:id', middlewareAuth.verifyToken, deletePersonnelFine)
personnelFineRoute.get('/personnelFine/:id', middlewareAuth.verifyToken, getPersonnelFine)
personnelFineRoute.get('/personnelFine', middlewareAuth.verifyToken, getListPersonnelFine)

module.exports = personnelFineRoute
