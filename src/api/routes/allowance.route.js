const express = require('express')
const { createAllowance, updateAllowance, deleteAllowance, getAllowance, getListAllowance } = require('../controllers/allowance.controllers')
const middlewareAuth = require('../middleware/auth')
const allowanceRoute = express.Router()

allowanceRoute.post('/allowances', middlewareAuth.verifyToken, createAllowance)
allowanceRoute.put('/allowances', middlewareAuth.verifyToken, updateAllowance)
allowanceRoute.delete('/allowances', middlewareAuth.verifyToken, deleteAllowance)
allowanceRoute.get('/allowances/:id', middlewareAuth.verifyToken, getAllowance)
allowanceRoute.get('/allowances', middlewareAuth.verifyToken, getListAllowance)

module.exports = allowanceRoute
