const express = require('express')
const { createRank, getListRank, getRank, updateRank, deleteRank } = require('../controllers/rank.controllers')
const middlewareAuth = require('../middleware/auth')
const rankRoute = express.Router()

rankRoute.post('/ranks', middlewareAuth.verifyToken, createRank)
rankRoute.get('/ranks', middlewareAuth.verifyToken, getListRank)
rankRoute.get('/ranks/:id', middlewareAuth.verifyToken, getRank)
rankRoute.put('/ranks', middlewareAuth.verifyToken, updateRank)
rankRoute.delete('/ranks', middlewareAuth.verifyToken, deleteRank)

module.exports = rankRoute