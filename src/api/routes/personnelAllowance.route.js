const express = require('express')
const { createPersonnelAllowance, updatePersonnelAllowance, deletePersonnelAllowance, getPersonnelAllowance, getListPersonnelAllowance } = require('../controllers/personnelAllowance.controllers')
const middlewareAuth = require('../middleware/auth')

const personnelAllowanceRoute = express.Router()

personnelAllowanceRoute.post('/personnelAllowances', middlewareAuth.verifyToken, createPersonnelAllowance)
personnelAllowanceRoute.put('/personnelAllowances', middlewareAuth.verifyToken, updatePersonnelAllowance)
personnelAllowanceRoute.delete('/personnelAllowances', middlewareAuth.verifyToken, deletePersonnelAllowance)
personnelAllowanceRoute.get('/personnelAllowances', middlewareAuth.verifyToken, getListPersonnelAllowance)
personnelAllowanceRoute.get('/personnelAllowances/:id', middlewareAuth.verifyToken, getPersonnelAllowance)


module.exports = personnelAllowanceRoute
