const express = require('express')
const { createPersonnelBonus, updatePersonnelBonus, deletePersonnelBonus, getPersonnelBonus, getListPersonnelBonus } = require('../controllers/personnelBonus.controllers')
const middlewareAuth = require('../middleware/auth')

const personnelBonusRoute = express.Router()

personnelBonusRoute.post('/personnelBonus', middlewareAuth.verifyToken, createPersonnelBonus)
personnelBonusRoute.put('/personnelBonus/:id', middlewareAuth.verifyToken, updatePersonnelBonus)
personnelBonusRoute.delete('/personnelBonus/:id', middlewareAuth.verifyToken, deletePersonnelBonus)
personnelBonusRoute.get('/personnelBonus/:id', middlewareAuth.verifyToken, getPersonnelBonus)
personnelBonusRoute.get('/personnelBonus', middlewareAuth.verifyToken, getListPersonnelBonus)

module.exports = personnelBonusRoute
