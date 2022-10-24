const express = require('express')
const { createPersonnelAllowance, updatePersonnelAllowance, deletePersonnelAllowance, getPersonnelAllowance, getListPersonnelAllowance } = require('../controllers/personnelAllowance.controllers')
const middlewareAuth = require('../middleware/auth')

const personnelAllowanceRoute = express.Router()

personnelAllowanceRoute.post('/personnelAllowance', middlewareAuth.verifyToken, createPersonnelAllowance)
personnelAllowanceRoute.put('/personnelAllowance/:id', middlewareAuth.verifyToken, updatePersonnelAllowance)
personnelAllowanceRoute.delete('/personnelAllowance/:id', middlewareAuth.verifyToken, deletePersonnelAllowance)
personnelAllowanceRoute.get('/personnelAllowance/:id', middlewareAuth.verifyToken, getPersonnelAllowance)
personnelAllowanceRoute.get('/personnelAllowance', middlewareAuth.verifyToken, getListPersonnelAllowance)

module.exports = personnelAllowanceRoute
