const express = require('express')
const { createBonus, updateBonus, getBonus, deleteBonus, getListBonus } = require('../controllers/bonus.controllers')
const middlewareAuth = require('../middleware/auth')
const bonusRoute = express.Router()

bonusRoute.post('/bonus', middlewareAuth.verifyToken, createBonus)
bonusRoute.put('/bonus/:id', middlewareAuth.verifyToken, updateBonus)
bonusRoute.get('/bonus/:id', middlewareAuth.verifyToken, getBonus)
bonusRoute.delete('/bonus/:id', middlewareAuth.verifyToken, deleteBonus)
bonusRoute.get('/bonus', middlewareAuth.verifyToken, getListBonus)

module.exports = bonusRoute