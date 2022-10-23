const express = require('express')
const { createRank, getListRank, getRank, updateRank, deleteRank } = require('../controllers/rank.controllers')
const middlewareAuth = require('../middleware/auth')
const rankRoute = express.Router()

rankRoute.post('/rank', middlewareAuth.verifyToken, createRank)
rankRoute.get('/rank', middlewareAuth.verifyToken, getListRank)
rankRoute.get('/rank/:id', middlewareAuth.verifyToken, getRank)
rankRoute.put('/rank/:id', middlewareAuth.verifyToken, updateRank)
rankRoute.delete('/rank/:id', middlewareAuth.verifyToken, deleteRank)

module.exports = rankRoute