const express = require('express')
const { createPersonnelFine, updatePersonnelFine, deletePersonnelFine, getPersonnelFine, getListPersonnelFine } = require('../controllers/personnelFine.controllers')
const middlewareAuth = require('../middleware/auth')


const personnelFineRoute = express.Router()

personnelFineRoute.post('/personnelFines', middlewareAuth.verifyToken, createPersonnelFine)
personnelFineRoute.put('/personnelFines', middlewareAuth.verifyToken, updatePersonnelFine)
personnelFineRoute.delete('/personnelFines', middlewareAuth.verifyToken, deletePersonnelFine)
personnelFineRoute.get('/personnelFines', middlewareAuth.verifyToken, getListPersonnelFine)
personnelFineRoute.get('/personnelFines/:id', middlewareAuth.verifyToken, getPersonnelFine)


module.exports = personnelFineRoute
