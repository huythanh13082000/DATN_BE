const express = require('express')
const { createPersonnelBonus, updatePersonnelBonus, deletePersonnelBonus, getPersonnelBonus, getListPersonnelBonus } = require('../controllers/personnelBonus.controllers')
const middlewareAuth = require('../middleware/auth')

const personnelBonusRoute = express.Router()

personnelBonusRoute.post('/personnelBonus', middlewareAuth.verifyToken, createPersonnelBonus)
personnelBonusRoute.put('/personnelBonus', middlewareAuth.verifyToken, updatePersonnelBonus)
personnelBonusRoute.delete('/personnelBonus', middlewareAuth.verifyToken, deletePersonnelBonus)
personnelBonusRoute.get('/personnelBonus', middlewareAuth.verifyToken, getListPersonnelBonus)
personnelBonusRoute.get('/personnelBonus/:id', middlewareAuth.verifyToken, getPersonnelBonus)


module.exports = personnelBonusRoute
