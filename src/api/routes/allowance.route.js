const express = require('express')
const { createAllowance, updateAllowance, deleteAllowance, getAllowance, getListAllowance } = require('../controllers/allowance.controllers')
const middlewareAuth = require('../middleware/auth')
const allowanceRoute = express.Router()

allowanceRoute.post('/allowance', middlewareAuth.verifyToken, createAllowance)
allowanceRoute.put('/allowance/:id', middlewareAuth.verifyToken, updateAllowance)
allowanceRoute.delete('/allowance/:id', middlewareAuth.verifyToken, deleteAllowance)
allowanceRoute.get('/allowance/:id', middlewareAuth.verifyToken, getAllowance)
allowanceRoute.get('/allowance', middlewareAuth.verifyToken, getListAllowance)

module.exports = allowanceRoute
